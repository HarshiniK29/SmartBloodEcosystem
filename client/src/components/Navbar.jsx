function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Smart Blood Ecosystem Platform
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Welcome Harshini
        </span>

        <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
          H
        </div>
      </div>
    </div>
  );
}

export default Navbar;
