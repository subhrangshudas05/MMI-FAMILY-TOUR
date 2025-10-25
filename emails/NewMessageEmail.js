import {
  Html,
  Button,
  Heading,
  Text,
  Section,
  Container,
} from "@react-email/components";
import React from "react";

export default function NewMessageEmail({ messageData }) {
  const { fullName, message } = messageData;
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard`;

  return (
    <Html lang="en">
      <Container style={container}>
        <Heading style={heading}>✉️ New Message from Website!</Heading>
        <Text style={paragraph}>
          You have received a new inquiry from the contact form.
        </Text>
        <Section style={infoSection}>
          <Text>
            <strong>From:</strong> {fullName}
          </Text>
          <Text>
            <strong>Message:</strong>
          </Text>
          <Text style={messageBox}>{message}</Text>
        </Section>
        <Button href={dashboardUrl} style={button}>
          Go to Admin Dashboard
        </Button>
      </Container>
    </Html>
  );
}

// Styles
const container = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f4f4",
  padding: "20px",
};
const heading = { color: "#333" };
const paragraph = { fontSize: "16px", color: "#555" };
const infoSection = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "5px",
  margin: "20px 0",
};
const messageBox = {
  borderLeft: "3px solid #007bff",
  paddingLeft: "10px",
  fontStyle: "italic",
  color: "#666",
};
const button = {
  backgroundColor: "#28a745",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
};
