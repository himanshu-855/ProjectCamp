import { user } from "../models/user.models";
import { apiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler";
import { apiError } from "../utils/api-error";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"


const genererateAccessAndRefreshToken = async (userId) => {
    try {
        await user.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(
            500, 
            "Something Went Wrong!!"
        )
    }
}

const registerUser = asyncHandler(async (requestAnimationFrame, res) => {
    const {email, userName, password, role} = req.body

    const existedUser = await user.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new apiError(409, "User Already Exists!!", [])
    }

     const user = await user.create({
        email,
        password,
        userName,
        isEmailVerified: false
    })
    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({validateBeforeSave: false})

    await sendEmail(
        {
            email: user?.email,
            subject: "Please Verify Your Email",
            MailgenContent: emailVerificationMailgenContent(
                user.userName,
                `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
            ),
        }
    );
    await user.findById(user._id).select(
        "-password-refreshToken -emailVerficationExpiry");

        if(!createdUser){
            throw new apiError(500, "Something Went Wrong while registering the user")
        }

        return res
        .status(201)
        .json(
            new apiResponse(
                200,
                {user: createdUser},
                "User Created Successfully ANd email is sent to you..."
            )
        )
})

export { registerUser };