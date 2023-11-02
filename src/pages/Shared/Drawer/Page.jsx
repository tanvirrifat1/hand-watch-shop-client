import { useContext } from "react";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Drawer = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const router = useNavigate();

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/api/v1/cart/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                Swal.fire("Deleted successfully");
                refetch();
              }
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  // const handleDelete = (id) => {
  //   if (user && user?.email) {
  //     fetch(`http://localhost:5000/api/v1/cart/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.data) {
  //           Swal.fire("Deleted successfully");
  //           refetch();
  //         }
  //       });
  //   } else {
  //     Swal.fire({
  //       title: "Please Login First?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Login",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router("/login", { state: { from: location } });
  //       }
  //     });
  //   }
  // };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div>
            {cart?.data?.map((cart) => (
              <div
                key={cart?.id}
                className="flex justify-between items-center mt-2 rounded-lg bg-slate-400 px-4 py-4"
              >
                <div>
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img src={cart?.image} alt="" width={100} height={100} />
                    </div>
                  </div>
                  <h1 className="text-xl text-black">{cart?.name}</h1>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDelete(cart?.id)}
                    className="rounded-xl hover:text-blue-400 bg-red-500 text-white btn-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
