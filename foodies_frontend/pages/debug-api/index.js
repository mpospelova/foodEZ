import DebugApiPage from "../../components/debug_api_page";
import { api_all } from "../../utils/api-calls";

export default function Home() {
    async function debugButton() {
        console.log("Debug Button pressed");
        let response_json = await api_all(["a", "b"]);
        console.log(response_json)
    }
    return (
      <>
        <DebugApiPage />
        <button color="default" onClick={debugButton}>
            Debug Button
        </button>
      </>
    );
}
