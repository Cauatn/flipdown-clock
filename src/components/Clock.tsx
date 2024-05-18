import "@/App.css";
import "@/script.js";

function Clock() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex md:flex-row md:justify-center md:items-center md:container md:space-x-5 lg:container-box">
      <div className="container-segment">
        <div className="segment text-[9rem] lg:text-[12rem]">
          <div className="flip-card" data-hours-tens>
            <div className="top bg-[#131313]">0</div>
            <div className="bottom bg-[#131313]">0</div>
          </div>
          <div className="flip-card" data-hours-ones>
            <div className="top bg-[#131313]">0</div>
            <div className="bottom bg-[#131313]">0</div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="container-segment">
          <div className="segment text-[9rem] lg:text-[12rem]">
            <div className="flip-card" data-minutes-tens>
              <div className="top bg-[#131313]">0</div>
              <div className="bottom bg-[#131313]">0</div>
            </div>
            <div className="flip-card" data-minutes-ones>
              <div className="top bg-[#131313]">0</div>
              <div className="bottom bg-[#131313]">0</div>
            </div>
          </div>
        </div>
        <div className="container-segment absolute bottom-2 right-2 lg:bottom-4 lg:right-4">
          <div className="segment text-2xl lg:text-3xl">
            <div className="flip-card" data-seconds-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-seconds-ones>
              <div className="top bg-[#222222]">0</div>
              <div className="bottom bg-[#222222]">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
