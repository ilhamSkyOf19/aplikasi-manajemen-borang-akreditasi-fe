import { type FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primary-white relative">
      {/* content */}
      <div className="w-full flex flex-col justify-start items-center px-4 gap-4">
        {/* title */}
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <h1 className="text-2xl font-medium lg:text-5xl">404</h1>

          {/* line */}
          <div className="w-px h-full bg-primary-black rounded-full" />

          {/* title */}
          <h1 className="text-sm lg:text-lg">Page Not Found</h1>
        </div>

        <div className="w-full flex flex-col justify-start items-center px-4 gap-2 lg:gap-4">
          {/* deskripsi */}
          <p className="text-sm text-center lg:text-base">
            Maaf, halaman yang anda cari tidak ditemukan.
          </p>

          {/* button back home */}
          <Link to="/" className="btn btn-soft text-sm font-medium">
            Kembali
          </Link>
        </div>
      </div>

      {/* copyright */}
      <p className="w-full text-xs text-primary-black/80 lg:text-sm absolute bottom-0 py-1 bg-gray-100 px-2">
        Copyright © 2023 Fakultas Ilmu Komputer, Universitas Muhammadiyah Metro
      </p>
    </div>
  );
};

export default NotFoundPage;
