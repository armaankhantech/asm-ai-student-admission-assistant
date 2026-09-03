const express = require("express");
const supabase = require("../db");

const router = express.Router();

// --------------------------------------------------
// POST /api/enquiries
// Create a new admission enquiry
// --------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      interestedCourse,
      enquiryType,
      question,
      email,
    } = req.body;

    // --------------------------------------------------
    // Basic server-side validation
    // Never rely only on frontend validation.
    // --------------------------------------------------

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!mobile || mobile.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: "Valid mobile number is required.",
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!question || question.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Enquiry question is required.",
      });
    }

    // --------------------------------------------------
    // Insert enquiry into Supabase
    // --------------------------------------------------

    const { data, error } = await supabase
      .from("admission_enquiries")
      .insert({
        student_name: fullName.trim(),
        contact: mobile.trim(),
        email: email.trim(),
        course: interestedCourse || null,
        enquiry: question.trim(),
        enquiry_type: enquiryType || null,
      })
      .select(
        "id, student_name, contact, email, course, enquiry, enquiry_type, priority, status, created_at"
      )
      .single();

    if (error) {
      console.error("Supabase enquiry insertion error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to save enquiry.",
      });
    }

    // --------------------------------------------------
    // Success response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry: data,
    });
  } catch (error) {
    console.error("Enquiry route error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the enquiry.",
    });
  }
});

module.exports = router;