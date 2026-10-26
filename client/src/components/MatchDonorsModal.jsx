import { useSelector } from "react-redux";

function MatchDonorsModal({
  analysis,
  onClose,
}) {
  const { user } = useSelector(
    (state) => state.auth
  );

  const isAdmin =
    user?.role === "admin";

  if (!analysis) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          Emergency Analysis Report
        </h2>

        <div className="bg-blue-50 border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">
            Request Details
          </h3>

          <p>
            Blood Group:
            {" "}
            {analysis.request.bloodGroup}
          </p>

          <p>
            Units Required:
            {" "}
            {analysis.request.unitsRequired}
          </p>

          <p>
            Location:
            {" "}
            {analysis.request.location}
          </p>

          <p>
            Priority:
            {" "}
            {analysis.request.priority}
          </p>
        </div>

        <div className="bg-gray-100 border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">
            Inventory Analysis
          </h3>

          <p>
            Available Units:
            {" "}
            {analysis.inventoryAnalysis.unitsAvailable}
          </p>

          <p>
            Units Required:
            {" "}
            {analysis.inventoryAnalysis.unitsRequired}
          </p>
        </div>

        <div className="bg-green-100 border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">
            Recommended Action
          </h3>

          <p>
            {analysis.recommendation}
          </p>
        </div>

        <h3 className="text-xl font-bold mb-3">
          Eligible Donors
        </h3>

        {analysis.eligibleDonors.length >
        0 ? (
          <div className="space-y-3 mb-6">
            {analysis.eligibleDonors.map(
              (donor) => (
                <div
                  key={donor._id}
                  className="border rounded p-4"
                >
                  <p>
                    <strong>
                      {donor.name}
                    </strong>
                  </p>

                  <p>
                    Blood Group:
                    {" "}
                    {donor.bloodGroup}
                  </p>

                  <p>
                    Location:
                    {" "}
                    {donor.address}
                  </p>

                  <p className="text-green-600 font-semibold">
                    Eligible
                  </p>

                  {isAdmin && (
                    <>
                      <p>
                        Phone:
                        {" "}
                        {donor.phone}
                      </p>

                      <p>
                        Email:
                        {" "}
                        {donor.email}
                      </p>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="bg-yellow-100 border p-4 rounded mb-6">
            <p>
              ⚠ No eligible donors found.
            </p>

            <p>
              Searching other blood banks and nearby donors is recommended.
            </p>
          </div>
        )}

        {analysis.ineligibleDonors
          .length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-3">
              Currently Ineligible Donors
            </h3>

            <div className="space-y-3">
              {analysis.ineligibleDonors.map(
                (donor) => (
                  <div
                    key={donor._id}
                    className="border rounded p-4 bg-red-50"
                  >
                    <p>
                      <strong>
                        {donor.name}
                      </strong>
                    </p>

                    <p>
                      Blood Group:
                      {" "}
                      {donor.bloodGroup}
                    </p>

                    <p>
                      Location:
                      {" "}
                      {donor.address}
                    </p>

                    <p className="text-red-600 font-semibold">
                      Not Eligible
                    </p>

                    <p>
                      Can donate after
                      {" "}
                      {donor.daysRemaining}
                      {" "}
                      days
                    </p>
                  </div>
                )
              )}
            </div>
          </>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchDonorsModal;