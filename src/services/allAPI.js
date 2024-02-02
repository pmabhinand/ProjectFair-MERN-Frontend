import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonAPI"



//register API
export const registerAPI = async(users)=>{
    return await commonAPI(`POST`,`${BASE_URL}/user/register`,users,"")
}

//login API
export const loginAPI = async(users)=>{
    return await commonAPI(`POST`,`${BASE_URL}/user/login`,users,"")
}

//logic to add project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI(`POST`,`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//homeproject
export const homeprojectAPI = async()=>{
    return await commonAPI(`GET`,`${BASE_URL}/project/home-project`)
}

//allproject
export const allprojectAPI = async(searchKey,reqHeader)=>{
    //query parameter = path?key=value
    return await commonAPI(`GET`,`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

//userproject
export const userprojectAPI = async(reqHeader)=>{
    return await commonAPI(`GET`,`${BASE_URL}/user/allproject`,"",reqHeader)
}

//edit project
export const editprojectAPI = async(projectId,reqBody,reqHeader)=>{
    //id is passes as path parameter
    return await commonAPI(`PUT`,`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//delete project
export const deleteUserprojectAPI = async(projectId,reqHeader)=>{
    return await commonAPI(`DELETE`,`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

//edit profile
export const editprofileAPI = async(reqBody,reqHeader)=>{
    //id is passes as path parameter
    return await commonAPI(`PUT`,`${BASE_URL}/user/edit/`,reqBody,reqHeader)
}