import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
export default function Map() {
  var userMap;
  var markerLatLng;
  var zoomLevel = 18;
  var zoomBeforeSearch = 18;
  window.onload = function () {
    const mapOption = {
      lat: 33.6708004850769,
      lng: 73.0135926466058,
      zoom: 18,
      minZoom: 6,
      maxZoom: 20,
      divID: "map",
      showZoomControl: false,
    };
    userMap = TPLMaps.map.initMap(mapOption);
    markerLatLng = {
      lat: userMap.getCenter().lat,
      lng: userMap.getCenter().lng,
    };

    getAddress();

    userMap.on("dragend", function () {
      markerLatLng = {
        lat: userMap.getCenter().lat,
        lng: userMap.getCenter().lng,
      };
      getAddress();
    });

    userMap.on("dragstart", function () {
      getAddress();
    });

    userMap.on("zoomend", function () {
      // zoomLevel = userMap.getZoom();

      updateUI();
    });

    var myCallback = function (data) {
      markerLatLng = { lat: data.lat, lng: data.lng };
      document.getElementById("address").value = data.cpd_address;
      document.getElementById("bottom_address").innerHTML = data.cpd_address;

      document.getElementById("province").value = data.parent3;
      document.getElementById("city").value = data.parent2;
      document.getElementById("area").value =
        data.parent1 == undefined ? "N/A" : data.parent1;
      document.getElementById("subarea").value =
        data.parent == undefined ? "N/A" : data.parent;

      var name_street = "";
      name_street = name_street + data.name;
      if (data.street != undefined) {
        name_street = name_street + ", " + data.street;
      }
      document.getElementById("name_street").value = name_street;
      userMap.setView([data.lat, data.lng], zoomLevel);
    };

    TPLMaps.widget.searchAutocomplete(document.getElementById("divSearch"), {
      extentSearch: false,
      map: userMap,
      limit: 20,
      callback: myCallback,
    });

    document.getElementById("txtSearch").onmouseover = function (event) {
      zoomLevel = userMap.getZoom();
    };
  };

  function locateMe() {
    zoomLevel = userMap.getZoom();
    userMap.locate({ setView: true, maxZoom: zoomLevel });
    setTimeout(function () {
      markerLatLng = {
        lat: userMap.getCenter().lat,
        lng: userMap.getCenter().lng,
      };
    }, 500);
    getAddress();
  }

  function zoomIn() {
    if (userMap.getZoom() < 20) {
      zoomLevel = userMap.getZoom() + 1;
      zoomBeforeSearch = userMap.getZoom() + 1;
      userMap.setView([markerLatLng.lat, markerLatLng.lng], zoomLevel);
    }

    zoomLevel = userMap.getZoom();
    setTimeout(function () {
      updateUI();
    }, 0);
  }

  function zoomOut() {
    if (userMap.getZoom() >= 6) {
      zoomLevel = userMap.getZoom() - 1;

      userMap.setView([markerLatLng.lat, markerLatLng.lng], zoomLevel);
    }

    setTimeout(function () {
      updateUI();
    }, 0);
  }

  function updateUI() {
    if (userMap.getZoom() == 20) {
      document.getElementById("zoomInSvg").style.fill = "#a2a2a2";
      document.getElementById("zoomOutSvg").style.fill = "#2e3436";
      return false;
    }
    if (userMap.getZoom() <= 6) {
      document.getElementById("zoomInSvg").style.fill = "#2e3436";
      document.getElementById("zoomOutSvg").style.fill = "#a2a2a2";
      return false;
    }

    if (userMap.getZoom() != 20 && userMap.getZoom() != 6) {
      document.getElementById("zoomInSvg").style.fill = "#2e3436";
      document.getElementById("zoomOutSvg").style.fill = "#2e3436";
    }
  }

  function getAddress() {
    setTimeout(function () {
      var options = {
        lat: userMap.getCenter().lat,
        lng: userMap.getCenter().lng,
      };
      var addressDetails = TPLMaps.api.pointSearch(options);

      addressDetails.subscribe((x) => {
        // $("#brnReverseGeocode").prop("disabled", true);
        // $("#btnClear").prop("disabled", true);
        var res = JSON.parse(x.body);
        res = res.data[0];
        console.log(res);
        document.getElementById("address").value = res.cpd_address;
        document.getElementById("bottom_address").innerHTML = res.cpd_address;

        document.getElementById("province").value = res.parent3;
        document.getElementById("city").value = res.parent2;
        document.getElementById("area").value =
          res.parent1 == undefined ? "N/A" : res.parent1;
        document.getElementById("subarea").value =
          res.parent == undefined ? "N/A" : res.parent;
        var name_street = "";
        name_street = name_street + res.name;
        if (res.street != undefined) {
          name_street = name_street + ", " + res.street;
        }
        document.getElementById("name_street").value = name_street;
        // map.setView([res[0].lat, res[0].lng], map.getZoom());
      });
    }, 700);
  }

  function showHideRightPanel() {
    var rightPanelRight = parseFloat($("#cover").css("left").replace("px", ""));
    var rightPanelWidth = $("#cover").css("width");

    if (rightPanelRight != 0) {
      $("#cover").css("left", "0%");
      $("#arrow-btn").css("transform", "rotate(180deg)");
    } else {
      $("#cover").css("left", "-" + rightPanelWidth);
      $("#arrow-btn").css("transform", "rotate(0deg)");
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="flex items-center border py-3 rounded-md bg-white">
            <span className="pl-2 w-[15%]">
              <img src={"/uploads/images/mark.svg"} width={20} alt="" />
            </span>
            <input
              type="text"
              className="flex-1 bg-transparent border-none pl-2 text-gray-400 text-[18px] focus:outline-none w-[85%]"
              placeholder="Enter Delivery Location"
              aria-label="Enter Delivery Location"
            />
            <span>
              <ChevronRight className="text-gray-400" />{" "}
            </span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="search-container">
            <div className="input-feild search-bar" id="divSearch"></div>
          </div>

          <div id="addressDiv" className="address-wrapper">
            <div className="MuiBox-root jss224 rightWidgets">
              <div className="MuiBox-root jss225 locateMeBtn">
                <svg
                  onClick={locateMe()}
                  className="locateMeSvg"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
                </svg>
              </div>
              <div className="zoomBtnsDiv">
                <svg
                  onClick={zoomIn()}
                  id="zoomInSvg"
                  className="MuiSvgIcon-root zoomIn false"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                </svg>
                <svg
                  onClick={zoomOut()}
                  id="zoomOutSvg"
                  className="MuiSvgIcon-root zoomOut false"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 13H5v-2h14v2z"></path>
                </svg>
              </div>
            </div>
            <div className="jss122">
              <div className="jss123">
                <svg
                  className="MuiSvgIcon-root jss124"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z"></path>
                </svg>
                <h5 id="bottom_address" className="address"></h5>
              </div>
            </div>
          </div>
          <div
            id="cover"
            className="shadow-lg p-3 mb-5 bg-white rounded"
            style="left: -400px;margin-top:10px;"
          >
            <div id="show_hide_btn" onClick={showHideRightPanel()}>
              <svg
                id="arrow-btn"
                className="bi bi-chevron-right shadow-sm "
                width="32"
                height="32"
                viewBox="0 0 20 20"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                style="transform: rotate(0deg);"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div id="header" className="text-center" style="font-size:14px;">
              <b>Address Details</b>
              <hr />
            </div>
            <form>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  Full Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  Address(Line 1)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Address"
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  House and Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name_street"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  Sub Area
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subarea"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  Area
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
              <div className="form-group">
                <label
                  for="source"
                  className=""
                  style="font-size:14px; font-weight: 500;color:#000;"
                >
                  Province
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  disabled
                  style="font-size:14px; font-weight: 500;"
                />
              </div>
            </form>
          </div>

          <div id="mapContainer">
            <div>
              <img
                src="https://api.tplmaps.com/js-api-v2/assets/images/red-marker.png"
                className="centerMarker"
              />
              <div id="map" className="map"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
