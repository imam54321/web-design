import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil category:", error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus category ini?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus category");
      }

      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );

      alert("Category berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Category gagal dihapus");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Category</h1>
          <p className="text-gray-500">
            Daftar Category Invofest
          </p>
        </div>

        <Link
          to="/dashboard/category/create"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          + Tambah Category
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama Category</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {cat.id}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {cat.name}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/category/edit/${cat.id}`}
                      >
                        <Button
                          title="Edit"
                          variant="outline"
                          type="button"
                        />
                      </Link>

                      <Button
                        title="Delete"
                        variant="primary"
                        type="button"
                        onClick={() =>
                          handleDelete(cat.id)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  Belum ada data category
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}