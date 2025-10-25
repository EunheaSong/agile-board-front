import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 사용자가 명시적으로 설정한 테마가 있는지 확인
    const userTheme = localStorage.getItem("user-theme") as Theme;
    if (userTheme) {
      return userTheme;
    }

    console.log(
      "사용자 시스템 테마 : ",
      window.matchMedia("(prefers-color-scheme: dark)")
    );
    // 사용자가 설정하지 않았다면 시스템 설정 사용
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    // HTML 요소에 data-theme 속성 설정
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      // 사용자가 명시적으로 테마를 설정하지 않았다면 시스템 설정 따르기
      const userTheme = localStorage.getItem("user-theme");
      if (!userTheme) {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        setTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // 사용자가 명시적으로 테마를 변경했음을 저장
    localStorage.setItem("user-theme", newTheme);
  };

  const resetToSystemTheme = () => {
    // 사용자 설정 제거
    localStorage.removeItem("user-theme");
    // 시스템 설정으로 되돌리기
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
  };

  return {
    theme,
    toggleTheme,
    resetToSystemTheme,
    isDark: theme === "dark",
    isSystemTheme: !localStorage.getItem("user-theme"),
  };
};
