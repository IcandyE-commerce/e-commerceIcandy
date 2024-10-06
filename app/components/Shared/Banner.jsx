import { lilita } from "../../ui/font";
import "../../css/Banner.css";

export default function Banner() {


  return (
    <>
      <div className="banner mx-12 md:columns-2">

        <div className="relative banner-item">
          <img
            className="imagenesBanner w-full h-96 object-cover mb-3"
            src="https://m.media-amazon.com/images/I/A1W84MmiQ6L.jpg"
            alt=""
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center mx-14 my-5">
              <span className="bg-pink-300 text-black text-xl rounded-md font-bold px-11 py-1 mb-4 uppercase">
                Catalogo
              </span>
              <span className="text-white text-7xl font-bold mb-5">-20%</span>
              <span className="text-white text-3xl">Mr Beast</span>
          </div>
        </div>
        <div className="relative banner-item">
          <img
            className="imagenesBanner w-full h-96 object-cover mb-3"
            src="https://wallpapercave.com/wp/wp12524177.jpg"
            alt=""
          />
         <div className="absolute inset-0 flex flex-col items-start justify-center mx-14 my-5">
              <span className="bg-pink-300 text-black text-xl rounded-md font-bold px-11 py-1 mb-4 uppercase">
                Catalogo
              </span>
              <span className="text-white text-7xl font-bold mb-5">-20%</span>
              <span className="text-white text-3xl">Prime</span>
          </div>
        </div>
        <div className="relative banner-item">
          <img
            className="imagenesBanner w-full h-96 object-cover mb-3"
            src="https://th.bing.com/th/id/R.4c0230798810863e5fea96794af6712c?rik=oJf17zE5t1vT3Q&riu=http%3a%2f%2ffarm5.staticflickr.com%2f4116%2f4894020495_a860ffdc49_z.jpg&ehk=eypf2AqT7PygnYS0lbPNv%2bTbbbnACsvnmYL1lVqIptU%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center mx-14 my-5 mb-1">
          
          <span className="text-white text-6xl font-bold my-5">Pocky</span>

              <span className="bg-pink-300 text-black text-xl rounded-md font-bold px-11 py-1 mb-4 uppercase">
                Catalogo
              </span>
          </div>
        </div>
        <div className="relative banner-item">
          <img
            className="imagenesBanner w-full h-96 object-cover mb-3"
            src="https://th.bing.com/th/id/OIP.v85SlhGEZ-M05afjTV3iuAHaE8?rs=1&pid=ImgDetMain"
            alt=""
          />
           <div className="absolute inset-0 flex flex-col items-start justify-center mx-14 my-5 mb-1">
          
          <span className="text-white text-6xl font-bold my-5">Peeps</span>

              <span className="bg-pink-300 text-black text-xl rounded-md font-bold px-11 py-1 mb-4 uppercase">
                Catalogo
              </span>
          </div>
        </div>
      </div>
    </>
  );
}