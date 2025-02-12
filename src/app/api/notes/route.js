import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb"; // Utility to connect to MongoDB
import Note from "../../../../models/note"; // Import the Note model

// GET all notes
export async function GET() {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const notes = await Note.find({}); // Fetch all notes
    return NextResponse.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error); // Log error for better debugging
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST a new note
export async function POST(req) {
  try {
    await connectToDatabase(); // Connect to MongoDB
    const { content } = await req.json(); // Parse request body
    console.log("Received note content:", content); // Log the incoming content

    if (!content) {
      console.error("❌ Missing content in the request");
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const newNote = new Note({ content }); // Create a new note
    await newNote.save(); // Save the note to the database
    console.log("New note added:", newNote); // Log the newly added note
    
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding note:", error.message); // Log the actual error message
    return NextResponse.json(
      { message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

