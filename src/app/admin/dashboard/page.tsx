import { Toaster } from "@/components/ui/sonner";
import { DataTableAccessory } from "./DataTableAccessory";

const DashboardPage = async () => {
    return (
        <div className='bg-[#686de0] min-h-screen'>
        <h2 className="flex items-center justify-center pt-9 text-4xl">Accessoires​ ⚙️​</h2>
      <DataTableAccessory />
      <Toaster richColors position='top-center'/>
      </div>
    );
};

export default DashboardPage;
