import LogoutButton from "@/components/auth/LogoutButton";

type Props = {
  email: string;
};

export default function IndustrySupervisorTopbar({
  email,
}: Props) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold">
          Industry Supervisor Portal
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">
            {email}
          </p>

          <p className="text-sm text-gray-500">
            INDUSTRY SUPERVISOR
          </p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}