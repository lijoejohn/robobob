import { LABELS } from "../../constants/language";
import { TEST_IDS } from "../../constants/dataTestids";

export const Header = (): React.ReactElement => {
  return (
    <>
      <div className="justify-center mb-4">
        <header
          className="p-0 m-0 text-lg font-bold"
          data-testid={TEST_IDS.APP_NAME}
        >
          {LABELS.APP_NAME}
        </header>
      </div>
    </>
  );
};
