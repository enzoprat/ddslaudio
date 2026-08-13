"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/catalog";

const STORAGE_KEY = "ddsl-demande-v1";

export type QuoteItem = {
  productId: string;
  quantity: number;
  /** Ids des options retenues (installation, technicien…). */
  options: string[];
  /** Précision libre : dimensions de scène, contrainte de lieu… */
  note?: string;
};

export type InstallationChoice = "oui" | "non" | "ne-sais-pas" | null;

type QuoteState = {
  items: QuoteItem[];
  installation: InstallationChoice;
  message: string;
};

const EMPTY: QuoteState = { items: [], installation: null, message: "" };

type QuoteContextValue = {
  items: QuoteItem[];
  installation: InstallationChoice;
  message: string;
  count: number;
  hydrated: boolean;
  isOpen: boolean;
  lastAdded: string | null;
  add: (productId: string, opts?: Partial<Omit<QuoteItem, "productId">>) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleOption: (productId: string, optionId: string) => void;
  setNote: (productId: string, note: string) => void;
  setInstallation: (value: InstallationChoice) => void;
  setMessage: (value: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  has: (productId: string) => boolean;
  detailed: { item: QuoteItem; product: Product }[];
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function isValid(state: unknown): state is QuoteState {
  if (!state || typeof state !== "object") return false;
  const s = state as QuoteState;
  return Array.isArray(s.items);
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuoteState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  /* Reprise de la sélection précédente */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isValid(parsed)) {
          // On écarte les références qui n'existent plus au catalogue.
          setState({
            ...EMPTY,
            ...parsed,
            items: parsed.items.filter((i) => Boolean(getProduct(i.productId))),
          });
        }
      }
    } catch {
      /* stockage indisponible : la demande reste utilisable, sans persistance */
    }
    setHydrated(true);
  }, []);

  /* Persistance */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  /* Fermeture au clavier */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Confirmation d'ajout */
  useEffect(() => {
    if (!lastAdded) return;
    const t = window.setTimeout(() => setLastAdded(null), 2600);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  const add = useCallback<QuoteContextValue["add"]>((productId, opts = {}) => {
    const product = getProduct(productId);
    if (!product) return;

    setState((prev) => {
      const existing = prev.items.find((i) => i.productId === productId);
      const addQty = opts.quantity ?? 1;

      const items = existing
        ? prev.items.map((i) =>
            i.productId === productId
              ? {
                  ...i,
                  quantity: clampQty(i.quantity + addQty, product),
                  options: opts.options
                    ? Array.from(new Set([...i.options, ...opts.options]))
                    : i.options,
                  note: opts.note ?? i.note,
                }
              : i,
          )
        : [
            ...prev.items,
            {
              productId,
              quantity: clampQty(addQty, product),
              options: opts.options ?? [],
              note: opts.note,
            },
          ];

      return { ...prev, items };
    });

    setLastAdded(product.name);
  }, []);

  const remove = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.productId !== productId),
    }));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (!product) return;
    if (quantity < 1) {
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.productId !== productId),
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId
          ? { ...i, quantity: clampQty(quantity, product) }
          : i,
      ),
    }));
  }, []);

  const toggleOption = useCallback((productId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId
          ? {
              ...i,
              options: i.options.includes(optionId)
                ? i.options.filter((o) => o !== optionId)
                : [...i.options, optionId],
            }
          : i,
      ),
    }));
  }, []);

  const setNote = useCallback((productId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId ? { ...i, note } : i,
      ),
    }));
  }, []);

  const setInstallation = useCallback((installation: InstallationChoice) => {
    setState((prev) => ({ ...prev, installation }));
  }, []);

  const setMessage = useCallback((message: string) => {
    setState((prev) => ({ ...prev, message }));
  }, []);

  const clear = useCallback(() => setState(EMPTY), []);

  const detailed = useMemo(
    () =>
      state.items
        .map((item) => {
          const product = getProduct(item.productId);
          return product ? { item, product } : null;
        })
        .filter((x): x is { item: QuoteItem; product: Product } => x !== null),
    [state.items],
  );

  const value = useMemo<QuoteContextValue>(
    () => ({
      items: state.items,
      installation: state.installation,
      message: state.message,
      count: state.items.reduce((n, i) => n + i.quantity, 0),
      hydrated,
      isOpen,
      lastAdded,
      add,
      remove,
      setQuantity,
      toggleOption,
      setNote,
      setInstallation,
      setMessage,
      clear,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      has: (id: string) => state.items.some((i) => i.productId === id),
      detailed,
    }),
    [
      state,
      hydrated,
      isOpen,
      lastAdded,
      add,
      remove,
      setQuantity,
      toggleOption,
      setNote,
      setInstallation,
      setMessage,
      clear,
      detailed,
    ],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

/** Ne dépasse pas la quantité réellement disponible quand elle est connue. */
function clampQty(qty: number, product: Product): number {
  const max = product.availableQuantity ?? 99;
  return Math.max(1, Math.min(qty, max));
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote doit être utilisé dans <QuoteProvider>");
  return ctx;
}
