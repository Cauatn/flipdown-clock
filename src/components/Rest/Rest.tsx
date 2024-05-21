import "./scriptRest.js";

function Rest() {
  return (
    <div>
      <RestClock />
    </div>
  );
}

function RestClock() {
  return (
    <div className="flex flex-col space-y-4 md:justify-center md:items-center lg:container-box">
      <div className="container-segment">
        <div className="segment text-[9rem]">
          <div className="flip-card" data-hours-tens-rest>
            <div className="top bg-[#131313]">0</div>
            <div className="bottom bg-[#131313]">0</div>
          </div>
          <div className="flip-card" data-hours-ones-rest>
            <div className="top bg-[#131313]">0</div>
            <div className="bottom bg-[#131313]">0</div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="container-segment">
          <div className="segment text-[9rem]">
            <div className="flip-card" data-minutes-tens-rest>
              <div className="top bg-[#131313]">0</div>
              <div className="bottom bg-[#131313]">0</div>
            </div>
            <div className="flip-card" data-minutes-ones-rest>
              <div className="top bg-[#131313]">0</div>
              <div className="bottom bg-[#131313]">0</div>
            </div>
          </div>
        </div>
        <div className="container-segment absolute bottom-2 right-2 lg:bottom-4 lg:right-4">
          <div className="segment text-2xl">
            <div className="flip-card" data-seconds-tens-rest>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-seconds-ones-rest>
              <div className="top bg-[#222222]">0</div>
              <div className="bottom bg-[#222222]">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rest;
