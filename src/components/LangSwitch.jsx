export default function LangSwitch({ value, onChange }) {
  return (
    <div className="seg">
      {[
        { code: "EN", label: "English" },
        { code: "HI", label: "हिंदी" },
        { code: "MR", label: "मराठी" },
      ].map((l) => (
        <button
          key={l.code}
          className={`seg__btn ${value === l.code ? "is-active" : ""}`}
          onClick={() => onChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
