"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuote } from "@/components/quote/QuoteProvider";
import { site } from "@/data/site";

/**
 * Barre d'action mobile : apparaît après le premier écran,
 * disparaît sur les pages de formulaire pour ne pas doubler les CTA.
 */
export function MobileActionBar() {
  const { count, open, isOpen } = useQuote();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Pages qui portent déjà leur propre formulaire : la barre y ferait doublon. */
  const formPages = ["/demande", "/besoin-conseil", "/dj", "/contact"];
  const hidden = isOpen || formPages.includes(pathname);
  const phone = site.contact.phone;
  const shown = visible && !hidden;

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-ink-950/11 bg-paper-100/92 backdrop-blur-md px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2">
        {phone && (
          <a
            href={`tel:${site.contact.phoneHref ?? phone}`}
            className="btn btn-sm btn-ghost flex-none px-4"
          >
            Appeler
          </a>
        )}
        {/* Demande vide : un seul bouton, sinon les deux disent la même chose. */}
        {count > 0 && (
          <button
            type="button"
            onClick={open}
            className="btn btn-sm flex-1"
            aria-label={`Ma demande, ${count} élément${count > 1 ? "s" : ""}`}
          >
            Ma demande ({count})
          </button>
        )}
        <Link href="/demande" className="btn btn-sm btn-primary flex-1">
          {count > 0 ? "Devis" : "Demander un devis"}
        </Link>
      </div>
    </div>
  );
}
