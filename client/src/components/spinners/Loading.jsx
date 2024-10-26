import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <div className="fixed flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-50">
      <div className="absolute">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="purple"
          secondaryColor="purple"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          className="relative"
        ></Oval>
      </div>

      <div className="relative w-12">
        <img src="../assets/imgs/logo.png" alt="" />
      </div>
    </div>
  );
}

export default Loading;
