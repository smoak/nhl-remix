type TabProps = {
  readonly text: string;
  readonly tabName: string;
};
export const Tab = ({ tabName, text }: TabProps) => {
  return (
    <li className="nav-item" role="presentation">
      <a
        href={`#tabs-${tabName}`}
        className="
      nav-link
      my-2
      block
      border-x-0
      border-t-0
      border-b-2 border-transparent px-6 py-3
      text-lg
      font-medium
      leading-tight hover:border-transparent
      hover:bg-nhl-gray-100
      focus:border-transparent
    "
        id={`tabs-${tabName}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#tabs-${tabName}`}
        role="tab"
        aria-controls={`tabs-${tabName}`}
        aria-selected="true"
      >
        {text}
      </a>
    </li>
  );
};
