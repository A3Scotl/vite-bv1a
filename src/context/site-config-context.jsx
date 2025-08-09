import { createContext, useContext, useEffect, useState,useCallback } from "react";
import { siteConfigApi } from "@/apis/site-config-api";
import { handleFetch } from "@/utils/fetch-helper";
const SiteConfigContext = createContext();

export function SiteConfigProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    await handleFetch({
      apiCall: siteConfigApi.get,
      setData: setSiteConfig,
      setLoading,
      errorMessage: "Không thể tải danh sách chức vụ",
    });
  }, []);

  return (
    <SiteConfigContext.Provider value={{ siteConfig, loading, setSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
