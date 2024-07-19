import { LANGUAGE_VERSIONS } from "../../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <details className="dropdown ">
      <summary className="btn px-2 min-h-0 h-6 ">{language}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {languages.map(([lang, key]) => (
          <li key={key}>
            <a onClick={() => onSelect(lang)}>{lang}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};
export default LanguageSelector;
