import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

//function for creating a listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}

//function for delete listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)

  if (!listing) {
    return next(errorHandler(404, "Listing not Found!"))
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can Only delete your own listing!"))
  }

  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("listing has been deleted!")
  } catch (error) {
    next(error)
  }
}

//controller for updating a listing
export const updateListing = async (req, res, next) => {
  //check if the listing exists
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"))
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update Your own listings!"))
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //if you dont add this you'll get the previous listing and not the updated listing
    )
    res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
}


//controller for getting a listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"))
    }
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}