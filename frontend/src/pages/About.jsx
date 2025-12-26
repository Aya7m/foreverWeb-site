import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div>
        <Title text="About" category="Us" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <img src={assets.about_img} alt="" className="w-full object-cover"/>
          </div>
          <div className="flex flex-col text-gray-600 gap-5">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes. Since our inception, we've worked
            </p>
            <p>
              tirelessly to curate a diverse selection of high-quality products
              that cater to every taste and preference. From fashion and beauty
              to electronics and home essentials, we offer an extensive
              collection sourced from trusted brands and suppliers.
            </p>
            <p>
              Our Mission Our mission at Forever is to empower customers with
              choice, convenience, and confidence. We're dedicated to providing
              a seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>

        <div className="mt-12 mb-24">
            <Title title="Why" category={'Choose Us'}/>
            <div className="flex items-center justify-between">
                <div className="flex flex-col border p-4">
                    <p className="font-semibold my-5">Quality Assurance:</p>
                    <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>

                </div>
                <div className="flex flex-col border p-4">
                    <p className="font-semibold my-5">Quality Assurance:</p>
                    <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>

                </div>
                <div className="flex flex-col border p-4">
                    <p className="font-semibold my-5">Quality Assurance:</p>
                    <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>

                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
