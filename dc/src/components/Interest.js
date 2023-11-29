import React, { useState, useEffect } from "react";
import Footer from "./Footer";

export default function Interest() {
  // const { vendorId } = useParams();
  // const [user, setUser] = useState([]);

  // console.log("vendorId=====", vendorId);

  // useEffect(() => {
  //   getuserdata();
  // }, []);

  // const getuserdata = async () => {
  //   let res = await axios.get("http://localhost:8000/api/vendor/getalluser");
  //   if (res.status === 200) {
  //     // SetPaymentcheckstatus(
  //     //   res.data?.vendorprofile.filter((i) => i._id == value?._id)
  //     // );
  //     setUser(res.data?.vendorprofile);
  //   }
  // };

  // console.log("user------3883", user);
  return (
    <>
      <section className="section_interest">
        <Footer />
      </section>
    </>
  );
}
