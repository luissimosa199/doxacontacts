import { useSession } from "next-auth/react";
import { useEffect } from "react";

function useOnlineLogger() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const saveSessionStatus = () => {
        fetch(`api/user/online`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ online: true }),
        });
      };

      const intervalId = setInterval(saveSessionStatus, 120000);

      return () => {
        clearInterval(intervalId);

        fetch(`api/user/online`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ online: false }),
        });
      };
    }
  }, [session?.user?.email, status]);
}

export default useOnlineLogger;
