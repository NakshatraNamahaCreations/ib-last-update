import React from "react";
import { Card } from "react-bootstrap";

function ContentManagement() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  return (
    <div>
      <h3>Content Management</h3>
      <br />
      <div className="row">
        <div className="col-2">
          <a href="/banner" className="cm-redirect">
            <Card className="content-mana-card">
              <div className="cm-card-bg">
                <div className="cm-img-adj">
                  <i class="fa-solid fa-circle-plus cm-font-awsm"></i>
                </div>
              </div>
              <div className="cm-text-content">Add Banners</div>
            </Card>
          </a>
        </div>

        <div className="col-2">
          <a
            href={
              user?.businesstype === "Products"
                ? "/editproducts"
                : "/editservices"
            }
            className="cm-redirect"
          >
            <Card className="content-mana-card">
              <div className="cm-card-bg">
                <div className="cm-img-adj">
                  <i class="fa-solid fa-pen cm-font-awsm"></i>
                </div>
              </div>
              <div className="cm-text-content">
                Edit{" "}
                {user?.businesstype === "Products" ? "Products" : "Services"}
              </div>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContentManagement;
