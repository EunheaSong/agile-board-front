import React, { useRef, useEffect, useState } from "react";

interface RichTextEditorProps {
  placeholder?: string;
  className?: string;
  onChange?: (content: string) => void;
  initialValue?: string;
}

// 테이블 컨텍스트 메뉴
function TableContextMenu({
  isOpen,
  position,
  onAddRowAbove,
  onAddRowBelow,
  onAddColumnLeft,
  onAddColumnRight,
  onDeleteTable,
  onClose,
}: {
  isOpen: boolean;
  position: { x: number; y: number };
  onAddRowAbove: () => void;
  onAddRowBelow: () => void;
  onAddColumnLeft: () => void;
  onAddColumnRight: () => void;
  onDeleteTable: () => void;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="table-context-menu"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1001,
      }}
    >
      <div className="context-menu-content">
        <button className="context-menu-item" onClick={onAddRowAbove}>
          ↕️ 위에 행 추가
        </button>
        <button className="context-menu-item" onClick={onAddRowBelow}>
          ↕️ 아래에 행 추가
        </button>
        <div className="context-menu-divider"></div>
        <button className="context-menu-item" onClick={onAddColumnLeft}>
          ↔️ 왼쪽에 열 추가
        </button>
        <button className="context-menu-item" onClick={onAddColumnRight}>
          ↔️ 오른쪽에 열 추가
        </button>
        <div className="context-menu-divider"></div>
        <button className="context-menu-item delete" onClick={onDeleteTable}>
          🗑️ 테이블 삭제
        </button>
      </div>
    </div>
  );
}

// 테이블 크기 선택 모달
function TableSizeModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rows: number, cols: number) => void;
}) {
  const [hoveredRows, setHoveredRows] = useState(0);
  const [hoveredCols, setHoveredCols] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMouseEnter = (row: number, col: number) => {
    if (isSelecting) {
      setHoveredRows(row + 1);
      setHoveredCols(col + 1);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    console.log("Cell clicked:", row + 1, col + 1);
    onConfirm(row + 1, col + 1);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setHoveredRows(row + 1);
    setHoveredCols(col + 1);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelecting && hoveredRows > 0 && hoveredCols > 0) {
      onConfirm(hoveredRows, hoveredCols);
    }
    setIsSelecting(false);
    setHoveredRows(0);
    setHoveredCols(0);
  };

  if (!isOpen) return null;

  return (
    <div className="table-size-modal-overlay" onClick={onClose}>
      <div className="table-size-modal" onClick={(e) => e.stopPropagation()}>
        <div className="table-size-header">
          <h3>테이블 크기 선택</h3>
          <p>원하는 크기의 셀을 클릭하거나 드래그하여 선택하세요</p>
        </div>

        <div className="table-size-preview">
          <div
            className="preview-grid"
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              if (isSelecting) {
                handleMouseUp({
                  preventDefault: () => {},
                  stopPropagation: () => {},
                } as React.MouseEvent);
              }
            }}
          >
            {Array.from({ length: 10 }, (_, row) =>
              Array.from({ length: 10 }, (_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`preview-cell ${
                    row < hoveredRows && col < hoveredCols ? "selected" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onClick={() => handleCellClick(row, col)}
                />
              ))
            )}
          </div>

          <div className="table-size-info">
            {hoveredRows > 0 && hoveredCols > 0 ? (
              <span>
                {hoveredRows} × {hoveredCols} 테이블
              </span>
            ) : (
              <span>크기를 선택하세요</span>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "텍스트를 입력하세요...",
  className = "",
  onChange,
  initialValue = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showTableContextMenu, setShowTableContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(
    null
  );

  // 브라우저 확장 프로그램 오류 방지
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // 브라우저 확장 프로그램 관련 에러들 무시
      const isExtensionError =
        event.message?.includes("message port closed") ||
        event.message?.includes("substring is not a function") ||
        event.message?.includes("Cannot read properties") ||
        event.message?.includes("Cannot access before initialization") ||
        event.message?.includes("TypeError") ||
        event.filename?.includes("content.js") ||
        event.filename?.includes("extension") ||
        event.filename?.includes("chrome-extension") ||
        event.filename?.includes("moz-extension") ||
        event.filename?.includes("safari-extension") ||
        event.filename?.includes("grammarly") ||
        event.filename?.includes("languagetool") ||
        event.filename?.includes("constants.ts"); // 소스맵 문제로 인한 잘못된 파일명

      if (isExtensionError) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // 브라우저 확장 프로그램 관련 Promise rejection 무시
      const isExtensionRejection =
        event.reason?.message?.includes("message port closed") ||
        event.reason?.message?.includes("substring is not a function") ||
        event.reason?.message?.includes("Cannot read properties") ||
        event.reason?.message?.includes(
          "Cannot access before initialization"
        ) ||
        event.reason?.message?.includes("TypeError") ||
        event.reason?.stack?.includes("content.js") ||
        event.reason?.stack?.includes("extension") ||
        event.reason?.stack?.includes("chrome-extension") ||
        event.reason?.stack?.includes("moz-extension") ||
        event.reason?.stack?.includes("safari-extension") ||
        event.reason?.stack?.includes("grammarly") ||
        event.reason?.stack?.includes("languagetool") ||
        event.reason?.stack?.includes("constants.ts"); // 소스맵 문제로 인한 잘못된 파일명

      if (isExtensionRejection) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported(command)
    ) {
      try {
        document.execCommand(command, false, value);
      } catch (error) {
        console.warn(`execCommand failed for ${command}:`, error);
        // execCommand가 실패한 경우 대체 방법 사용
        if (command === "insertUnorderedList") {
          insertUnorderedList();
        } else if (command === "insertOrderedList") {
          insertOrderedList();
        }
      }
    }
    editorRef.current?.focus();
    handleInput();
  };

  const insertUnorderedList = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listItem = document.createElement("li");
      listItem.setAttribute("data-gramm", "false");
      listItem.setAttribute("data-gramm_editor", "false");
      listItem.setAttribute("data-enable-grammarly", "false");
      listItem.setAttribute("spellcheck", "false");

      // 현재 선택된 텍스트가 있으면 리스트 아이템에 추가, 없으면 빈 텍스트
      if (range.toString().trim()) {
        listItem.textContent = range.toString();
      } else {
        listItem.textContent = "";
      }

      const list = document.createElement("ul");
      list.setAttribute("data-gramm", "false");
      list.setAttribute("data-gramm_editor", "false");
      list.setAttribute("data-enable-grammarly", "false");
      list.setAttribute("spellcheck", "false");
      list.appendChild(listItem);

      range.deleteContents();
      range.insertNode(list);

      // 커서를 리스트 아이템 끝으로 이동
      const newRange = document.createRange();
      newRange.setStartAfter(listItem);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // 선택이 없는 경우 현재 커서 위치에 리스트 추가
      const listItem = document.createElement("li");
      listItem.textContent = "";
      listItem.setAttribute("data-gramm", "false");
      listItem.setAttribute("data-gramm_editor", "false");
      listItem.setAttribute("data-enable-grammarly", "false");
      listItem.setAttribute("spellcheck", "false");

      const list = document.createElement("ul");
      list.setAttribute("data-gramm", "false");
      list.setAttribute("data-gramm_editor", "false");
      list.setAttribute("data-enable-grammarly", "false");
      list.setAttribute("spellcheck", "false");
      list.appendChild(listItem);

      editorRef.current.appendChild(list);

      // 커서를 리스트 아이템 끝으로 이동
      const range = document.createRange();
      range.setStartAfter(listItem);
      range.collapse(true);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    handleInput();
  };

  const insertOrderedList = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listItem = document.createElement("li");
      listItem.setAttribute("data-gramm", "false");
      listItem.setAttribute("data-gramm_editor", "false");
      listItem.setAttribute("data-enable-grammarly", "false");
      listItem.setAttribute("spellcheck", "false");

      // 현재 선택된 텍스트가 있으면 리스트 아이템에 추가, 없으면 빈 텍스트
      if (range.toString().trim()) {
        listItem.textContent = range.toString();
      } else {
        listItem.textContent = "";
      }

      const list = document.createElement("ol");
      list.setAttribute("data-gramm", "false");
      list.setAttribute("data-gramm_editor", "false");
      list.setAttribute("data-enable-grammarly", "false");
      list.setAttribute("spellcheck", "false");
      list.appendChild(listItem);

      range.deleteContents();
      range.insertNode(list);

      // 커서를 리스트 아이템 끝으로 이동
      const newRange = document.createRange();
      newRange.setStartAfter(listItem);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // 선택이 없는 경우 현재 커서 위치에 리스트 추가
      const listItem = document.createElement("li");
      listItem.textContent = "";
      listItem.setAttribute("data-gramm", "false");
      listItem.setAttribute("data-gramm_editor", "false");
      listItem.setAttribute("data-enable-grammarly", "false");
      listItem.setAttribute("spellcheck", "false");

      const list = document.createElement("ol");
      list.setAttribute("data-gramm", "false");
      list.setAttribute("data-gramm_editor", "false");
      list.setAttribute("data-enable-grammarly", "false");
      list.setAttribute("spellcheck", "false");
      list.appendChild(listItem);

      editorRef.current.appendChild(list);

      // 커서를 리스트 아이템 끝으로 이동
      const range = document.createRange();
      range.setStartAfter(listItem);
      range.collapse(true);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    handleInput();
  };

  const insertHTML = (html: string) => {
    console.log("insertHTML called with:", html);
    if (editorRef.current) {
      console.log("Editor ref exists:", editorRef.current);

      // 에디터에 포커스 먼저
      editorRef.current.focus();

      const selection = window.getSelection();
      console.log("Selection:", selection);

      // 에디터 내부의 선택인지 확인
      if (
        selection &&
        selection.rangeCount > 0 &&
        editorRef.current.contains(selection.anchorNode)
      ) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }

        range.insertNode(fragment);
        selection.removeAllRanges();
        range.collapse(false);
        selection.addRange(range);
        console.log("HTML inserted via selection");
      } else {
        // 선택이 없거나 에디터 외부 선택이면 에디터 끝에 삽입
        editorRef.current.innerHTML += html;
        console.log("HTML appended to editor");
      }
      handleInput();
    } else {
      console.log("Editor ref is null");
    }
  };

  const insertTable = () => {
    console.log("Table button clicked, opening modal");
    setShowTableModal(true);
  };

  // 테이블 편집 함수들
  const addRowAbove = () => {
    if (selectedTable) {
      const tbody = selectedTable.querySelector("tbody") || selectedTable;
      const firstRow = tbody.querySelector("tr");
      if (firstRow) {
        const newRow = firstRow.cloneNode(true) as HTMLTableRowElement;
        // 모든 셀을 빈 셀로 만들기
        newRow.querySelectorAll("td").forEach((cell) => {
          cell.innerHTML = "&nbsp;";
        });
        // tbody가 있으면 tbody에, 없으면 테이블에 직접 추가
        tbody.insertBefore(newRow, firstRow);
        handleInput();
      }
    }
    setShowTableContextMenu(false);
  };

  const addRowBelow = () => {
    if (selectedTable) {
      const tbody = selectedTable.querySelector("tbody") || selectedTable;
      const lastRow = tbody.querySelector("tr:last-child");
      if (lastRow) {
        const newRow = lastRow.cloneNode(true) as HTMLTableRowElement;
        // 모든 셀을 빈 셀로 만들기
        newRow.querySelectorAll("td").forEach((cell) => {
          cell.innerHTML = "&nbsp;";
        });
        tbody.appendChild(newRow);
        handleInput();
      }
    }
    setShowTableContextMenu(false);
  };

  const addColumnLeft = () => {
    if (selectedTable) {
      const tbody = selectedTable.querySelector("tbody") || selectedTable;
      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        const firstCell = row.querySelector("td");
        if (firstCell) {
          const newCell = firstCell.cloneNode(true) as HTMLTableCellElement;
          newCell.innerHTML = "&nbsp;";
          row.insertBefore(newCell, firstCell);
        }
      });
      handleInput();
    }
    setShowTableContextMenu(false);
  };

  const addColumnRight = () => {
    if (selectedTable) {
      const tbody = selectedTable.querySelector("tbody") || selectedTable;
      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        const lastCell = row.querySelector("td:last-child");
        if (lastCell) {
          const newCell = lastCell.cloneNode(true) as HTMLTableCellElement;
          newCell.innerHTML = "&nbsp;";
          row.appendChild(newCell);
        }
      });
      handleInput();
    }
    setShowTableContextMenu(false);
  };

  const deleteTable = () => {
    if (selectedTable) {
      selectedTable.remove();
      handleInput();
    }
    setShowTableContextMenu(false);
  };

  const handleTableContextMenu = (
    e: React.MouseEvent,
    table: HTMLTableElement
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedTable(table);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowTableContextMenu(true);
  };

  const handleTableConfirm = (rows: number, cols: number) => {
    console.log("Creating table:", rows, "x", cols);
    const tableRows = Array.from({ length: rows }, () => {
      const cells = Array.from({ length: cols }, () => {
        return `<td style="border: 1px solid #ddd; padding: 8px;">&nbsp;</td>`;
      }).join("");
      return `<tr>${cells}</tr>`;
    }).join("");

    const table = `
      <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
        ${tableRows}
      </table>
    `;
    console.log("Inserting table HTML:", table);

    // 모달을 먼저 닫고 에디터에 포커스
    setShowTableModal(false);

    // 다음 프레임에서 테이블 삽입 (모달이 완전히 닫힌 후)
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        insertHTML(table);
      }
    }, 100);
  };

  const insertLink = () => {
    const url = prompt("링크 URL을 입력하세요:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const changeFontSize = (size: string) => {
    execCommand("fontSize", size);
  };

  const changeFontColor = () => {
    const color = prompt("색상을 입력하세요 (예: #ff0000):");
    if (color) {
      execCommand("foreColor", color);
    }
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* 테이블 크기 선택 모달 */}
      <TableSizeModal
        isOpen={showTableModal}
        onClose={() => setShowTableModal(false)}
        onConfirm={handleTableConfirm}
      />

      {/* 테이블 컨텍스트 메뉴 */}
      <TableContextMenu
        isOpen={showTableContextMenu}
        position={contextMenuPosition}
        onAddRowAbove={addRowAbove}
        onAddRowBelow={addRowBelow}
        onAddColumnLeft={addColumnLeft}
        onAddColumnRight={addColumnRight}
        onDeleteTable={deleteTable}
        onClose={() => setShowTableContextMenu(false)}
      />

      {/* 툴바 */}
      <div className="editor-toolbar">
        {/* 텍스트 서식 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            title="볼드"
            className="toolbar-btn"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            title="이탤릭"
            className="toolbar-btn"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            title="밑줄"
            className="toolbar-btn"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => execCommand("strikeThrough")}
            title="취소선"
            className="toolbar-btn"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        {/* 헤딩 */}
        <div className="toolbar-group">
          <select
            onChange={(e) => {
              if (e.target.value === "p") {
                execCommand("formatBlock", "div");
              } else {
                execCommand("formatBlock", e.target.value);
              }
            }}
            className="toolbar-select"
            title="헤딩"
          >
            <option value="p">본문</option>
            <option value="h1">제목 1</option>
            <option value="h2">제목 2</option>
            <option value="h3">제목 3</option>
            <option value="h4">제목 4</option>
          </select>
        </div>

        <div className="toolbar-divider"></div>

        {/* 폰트 크기 */}
        <div className="toolbar-group">
          <select
            onChange={(e) => changeFontSize(e.target.value)}
            className="toolbar-select"
            title="폰트 크기"
          >
            <option value="">크기</option>
            <option value="1">8px</option>
            <option value="2">10px</option>
            <option value="3">12px</option>
            <option value="4">14px</option>
            <option value="5">18px</option>
            <option value="6">24px</option>
            <option value="7">36px</option>
          </select>
        </div>

        <div className="toolbar-divider"></div>

        {/* 색상 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={changeFontColor}
            title="텍스트 색상"
            className="toolbar-btn color-btn"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => {
              const color = prompt("배경색을 입력하세요 (예: #ffff00):");
              if (color) {
                execCommand("backColor", color);
              }
            }}
            title="배경색"
            className="toolbar-btn color-btn"
          >
            🎨
          </button>
        </div>

        <div className="toolbar-divider"></div>

        {/* 리스트 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={insertUnorderedList}
            title="불릿 리스트"
            className="toolbar-btn"
          >
            • 목록
          </button>
          <button
            type="button"
            onClick={insertOrderedList}
            title="번호 리스트"
            className="toolbar-btn"
          >
            1. 목록
          </button>
        </div>

        <div className="toolbar-divider"></div>

        {/* 정렬 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand("justifyLeft")}
            title="왼쪽 정렬"
            className="toolbar-btn"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyCenter")}
            title="가운데 정렬"
            className="toolbar-btn"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyRight")}
            title="오른쪽 정렬"
            className="toolbar-btn"
          >
            →
          </button>
          {/* <button
            type="button"
            onClick={() => execCommand("justifyFull")}
            title="양쪽 정렬"
            className="toolbar-btn"
          >
            ⇔
          </button> */}
        </div>

        <div className="toolbar-divider"></div>

        {/* 삽입 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={insertLink}
            title="링크 삽입"
            className="toolbar-btn"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={insertTable}
            title="표 삽입"
            className="toolbar-btn"
          >
            📊
          </button>
          <button
            type="button"
            onClick={() =>
              insertHTML(
                "<hr style='margin: 10px 0; border: none; border-top: 1px solid #ddd;'>"
              )
            }
            title="구분선"
            className="toolbar-btn"
          >
            ─
          </button>
        </div>

        <div className="toolbar-divider"></div>

        {/* 기타 */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand("undo")}
            title="실행 취소"
            className="toolbar-btn"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => execCommand("redo")}
            title="다시 실행"
            className="toolbar-btn"
          >
            ↷
          </button>
          <button
            type="button"
            onClick={() => execCommand("removeFormat")}
            title="서식 제거"
            className="toolbar-btn"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div
        ref={editorRef}
        contentEditable
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        onInput={handleInput}
        onContextMenu={(e) => {
          const target = e.target as HTMLElement;
          const table = target.closest("table");
          if (table) {
            handleTableContextMenu(e, table as HTMLTableElement);
          }
        }}
        className="editor-content"
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
