// pages/api/notes/[id]/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb"; // Utility to connect to MongoDB
import Note from "../../../../../models/note"; // Import the Note model
import mongoose from "mongoose";

// Handle GET request for a specific note by id
export async function GET(req, { params }) {
  const { id } = params;  // Extract id from params

  try {
    await connectToDatabase(); // Connect to MongoDB
    const note = await Note.findById(id); // Fetch the note by id

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching note:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// 📝 UPDATE (EDIT) a note by ID
export async function PUT(req, { params }) {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const { id } = params; // Extract note ID from params
    const { content } = await req.json(); // Get updated content

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
    }

    // Update note in the database
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// 🗑 DELETE a note by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Log the params to see its structure
    console.log('params:', params);

    // Now safely extract the id, making sure it exists
    const { id } = params || {}; // This ensures params is valid

    if (!id) {
      return NextResponse.json({ message: "Note ID is required" }, { status: 400 });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
    }

    // Delete note from the database
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

