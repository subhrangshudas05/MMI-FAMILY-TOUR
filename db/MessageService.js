import { Message } from "@/models/messageSchema";
import connectDb from "@/db/connectDb";

/**
 * Insert a new message into the database.
 * @param {object} messageData - The message data from the form.
 */
export async function insertMessage(messageData) {
  await connectDb();
  const created = await Message.create(messageData);
  return created;
}

/**
 * Get all messages for an admin panel, sorted by newest first.
 */
export async function getAllMessages() {
    await connectDb();
    const messages = await Message.find().sort({ createdAt: -1 });
    return messages;
}

/**
 * Delete a message by its ID.
 * @param {string} id - The _id of the message to delete.
 */
export async function deleteMessage(id) {
    await connectDb();
    const deleted = await Message.findByIdAndDelete(id);
    return deleted;
}

