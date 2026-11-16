import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Select — champ design-system listbox (Rule Н6).
 *
 * The native browser `<select>` was previously used in CreateProposal.jsx.
 * Rule Н6 forbids it: this component replaces it with a fully keyboard-,
 * mouse- and touch-accessible listbox styled with the same tokens as
 * `.champ-input`, that opens upward when there isn't room below (checked
 * against viewport height on open) and never exceeds the viewport.
 *
 * options: Array<{ value, label }>
 */
export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Выберите значение",
  className = "",
  id,
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  const openList = () => {
    const estimatedHeight = Math.min(options.length * 40 + 8, 280);
    const rect = buttonRef.current?.getBoundingClientRect();
    const spaceBelow = rect ? window.innerHeight - rect.bottom : 0;
    setOpenUpward(spaceBelow < estimatedHeight && (rect?.top || 0) > estimatedHeight);
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const commit = (index) => {
    const opt = options[index];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (e) => {
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      if (!open) openList();
    }
  };

  const onListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={`position-relative ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
          {label}
        </label>
      )}
      <button
        type="button"
        id={selectId}
        ref={buttonRef}
        className="champ-input d-flex align-items-center justify-content-between gap-2 text-start"
        style={{ minHeight: 44, cursor: "pointer" }}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKeyDown}
      >
        <span style={{ color: selected ? "var(--text)" : "var(--text-dim)" }}>
          {selected ? selected.label : placeholder}
        </span>
        <span aria-hidden="true" style={{ color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={typeof label === "string" ? label : "Варианты"}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="position-absolute m-0 p-1 rounded-3"
          style={{
            listStyle: "none",
            left: 0,
            right: 0,
            [openUpward ? "bottom" : "top"]: "calc(100% + 4px)",
            zIndex: 1000,
            maxHeight: 280,
            overflowY: "auto",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-hover)",
          }}
          ref={(node) => {
            listRef.current = node;
            node?.focus();
          }}
        >
          {options.map((opt, index) => {
            const isActive = index === activeIndex;
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className="rounded-2"
                style={{
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  color: "var(--text)",
                  background: isActive ? "var(--cyan-soft)" : "transparent",
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
