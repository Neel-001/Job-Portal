import {Company} from '../models/company.model.js';
import getUriData from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "You cant register same company",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company
        });

    } catch (error) {
        console.log(error);
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true,
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try  {
      const comapnyId =   req.params.id;
      const company = await Company.findById(comapnyId);
      if(!company){
          return res.status(404).json({
              message: "Company not found",
              success: false
          });
      }
      return res.status(200).json({
          message: "Company found",
          success: true,
          company
      });
    } catch (error) {
        console.log(error);
    }
}


export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;

        // Build update data object with only provided fields
        const updateData = {};
        if (name !== undefined && name !== '') updateData.name = name;
        if (description !== undefined && description !== '') updateData.description = description;
        if (website !== undefined && website !== '') updateData.website = website;
        if (location !== undefined && location !== '') updateData.location = location;

        // Only upload to cloudinary if file is provided
        if (file) {
            const fileUri = getUriData(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}