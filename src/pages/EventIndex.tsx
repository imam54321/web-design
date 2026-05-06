import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function EventIndex() {
  return (
    <div className="py-5 items-center justify-center">
      <h1 className="mb-6 font-bold text-center text-4xl  ">
        Event
      </h1>


      {/* List Campaign */}
      <div className="flex flex-col gap-4 pt-5 pl-4 ">
        <h1 className="text-2xl font-mono">Tambahkan Event</h1>
            <Link
                to="/dashboard/event/create"
                className="text-l font-bold "
            >
            <Button 
            type="button"
                title="Create New"
                variant="primary" 
                />
            </Link>

      </div>
    </div>
  );
}