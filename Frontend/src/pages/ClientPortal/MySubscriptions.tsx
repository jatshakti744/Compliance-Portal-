import PageMeta from "../../components/common/PageMeta";

export default function MySubscriptions() {
  return (
    <>
      <PageMeta title="My Subscriptions | RAGCP" description="View your active subscriptions." />
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">My Subscriptions</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            No active subscriptions found.
          </p>
        </div>
      </div>
    </>
  );
}
