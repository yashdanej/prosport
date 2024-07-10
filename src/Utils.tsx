import axios from "axios";

export const BACKEND_URL = "http://localhost:3000/api/v1";

interface axiosConf {
    url: any,
    method: string,
    data: any
    headers: { Authorization: string; };
}

export const api = async (pathname: string, method: string, body: any, formData=false, includeCredentials = false) => {
    const axiosConfig: axiosConf = {
        url: `${BACKEND_URL}${pathname}`,
        method: method,
        data: undefined,
        headers: {
            Authorization: ""
        }
    };
    if(body){
        if(formData){
          console.log("body------", body);
            const data = new FormData();
            for (const key in body) {
              if (body.hasOwnProperty(key)) {
                  data.append(key, body[key]);
              }
            }
            console.log('data', data);
            axiosConfig.data = data;
        }else{
            axiosConfig.data = body;
        }
    }
    if (includeCredentials) {
        const storedUser: any = localStorage.getItem("login-user");
        console.log(storedUser);
        const { token } = JSON.parse(storedUser);
        axiosConfig.headers = {
            'Authorization': `Token ${token}`
        };
    }
    console.log("axiosConfig", axiosConfig);

    return await axios(axiosConfig)
        .then((res) => res)
        .catch((e) => {
            console.log('inside: ', e);
            return e;
        });
};

export const changeText = (e: { target: { name: any; value: any } }, set: (arg0: any) => void, content: any, value?: any) => {
    set({...content, [e.target.name]: value?value:e.target.value})
}

export const convertToIST = (dateString: any) => {
  const date = new Date(dateString);
  // Convert to IST by adding 5 hours and 30 minutes
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffset);
  // Format the date in the desired format (e.g., DD-MM-YYYY HH:mm:ss)
  const formattedDate = istDate.toLocaleString("en-IN", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  });
  return formattedDate;
};

export const Loading = () => {
    const loaderStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
  
    const circleStyle = {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      margin: '0 10px',
      backgroundColor: 'white',
      animation: 'circle1 1s ease-in-out infinite'
    };
  
    const circleStyleWithDelay = (delay: number) => ({
      ...circleStyle,
      animationDelay: `${delay}s`
    });
  
    return (
      <div style={loaderStyle}>
        <div style={circleStyle}></div>
        <div style={circleStyleWithDelay(0.2)}></div>
        <div style={circleStyleWithDelay(0.4)}></div>
        <div style={circleStyleWithDelay(0.6)}></div>
        <div style={circleStyleWithDelay(0.8)}></div>
        <style>
          {`
            @keyframes circle1 {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.5);
                opacity: 0.5;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    );
  };
