import { useEffect } from "react";
import { useRouter } from "next/navigation";

const usePolling = (searchParam: string | null, ms: number = 60000) => {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval running");
      if (!searchParam) {
        console.log("Refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, ms]);
};

export default usePolling;
