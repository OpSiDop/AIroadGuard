import ErrorClass from "../../helper/types/error";
import database from "../../loaders/database";

export const accident = async (cameraID: string, accidentImage: string) => {
  try {
    const data = await (await database()).collection("accidents").insertOne({
      accidentImage: accidentImage,
      cameraID: cameraID,
      time:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
    });
    if (!data) {
      throw new ErrorClass("Error uploading image", 400);
    }
    return {
      success: true,
      status: 201,
      message: "Accident image uploaded",
    };
  } catch (error) {
    console.log(error);
    throw new ErrorClass(
      error.message ?? "Image updation failed",
      error.status ?? 500
    );
  }
};

export const getAccident = async (cameraID: string | string[]) => {
  try {
    const accidentData = await (await database())
      .collection("accidents")
      .find({ cameraID: cameraID })
      .toArray();
    const locationData = await (await database())
      .collection("cameras")
      .findOne({ cameraID: cameraID });
    if (!accidentData || !locationData) {
      throw new ErrorClass("Unable to fetch", 404);
    }
    return {
      success: true,
      status: 201,
      data: { accidentData: accidentData, locationData: locationData },
    };
  } catch (error) {
    console.log(error);
    throw new ErrorClass(
      error.message ?? "Unable to fetch accident",
      error.status ?? 500
    );
  }
};
