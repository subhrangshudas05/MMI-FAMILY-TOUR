import {
  Html,
  Button,
  Heading,
  Text,
  Section,
  Container,
  Hr,
} from "@react-email/components";
import React from "react";

// A simple star component to render stars visually
const Star = () => (
  <span style={{ color: "#ffc107", fontSize: "20px" }}>★</span>
);

export default function NewReviewEmail({ reviewData }) {
  const { name, pkgTitle, stars, comment } = reviewData;
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard`;

  return (
    <Html lang="en">
      <Container style={container}>
        <Heading style={heading}>⭐ New Review Submitted!</Heading>
        <Text style={paragraph}>
          A new review has been submitted and is awaiting your approval. Please
          review the details below.
        </Text>

        <Section style={infoSection}>
          <Text>
            <strong>Package:</strong> {pkgTitle}
          </Text>
          <Text>
            <strong>Reviewer Name:</strong> {name}
          </Text>
          <Text>
            <strong>Rating:</strong>{" "}
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} />
            ))}
            {Array.from({ length: 5 - stars }).map((_, i) => (
              <span key={i} style={{ color: "#e0e0e0", fontSize: "20px" }}>
                ★
              </span>
            ))}
          </Text>
          {comment && (
            <>
              <Hr style={{ borderColor: "#eee", margin: "16px 0" }} />
              <Text>
                <strong>Comment:</strong>
              </Text>
              <Text style={commentBox}>"{comment}"</Text>
            </>
          )}
        </Section>

        <Button href={dashboardUrl} style={button}>
          Manage Reviews in Dashboard
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
  borderRadius: "8px",
};
const heading = { color: "#333", fontSize: "24px" };
const paragraph = { fontSize: "16px", color: "#555" };
const infoSection = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "5px",
  margin: "20px 0",
};
const commentBox = {
  fontStyle: "italic",
  color: "#666",
  borderLeft: "3px solid #eee",
  paddingLeft: "15px",
};
const button = {
  backgroundColor: "#5a67d8",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: "bold",
};
