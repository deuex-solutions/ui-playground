import styles from "./index.module.scss";
import { useCallback, useEffect, useState, RefObject } from "react";

interface IOption {
  label: string;
  action: () => void;
}

interface IContextMenuProps {
  parentRef?: RefObject<HTMLSpanElement | HTMLDivElement>;
  options: IOption[];
  excludedClassNames?: string[];
}

const ContextMenu = ({
  parentRef,
  options,
  excludedClassNames,
}: IContextMenuProps) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      if (
        excludedClassNames?.some((className) =>
          event.target.className.includes(className)
        )
      )
        return;

      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [excludedClassNames]
  );

  const handleClick = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    let targetRef = parentRef ? parentRef.current : document;

    document.addEventListener("click", handleClick);
    targetRef?.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      targetRef?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return show ? (
    <ul
      className={styles.menu}
      style={{
        top: anchorPoint.y,
        left: anchorPoint.x,
      }}
    >
      {options.map((option) => (
        <li
          className={styles.listItem}
          onClick={option.action}
          key={option.label}
        >
          {option.label}
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
};
export default ContextMenu;
