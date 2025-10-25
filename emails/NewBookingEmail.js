import { Html, Button, Heading, Text, Section, Container } from "@react-email/components";
import React from 'react';

export default function NewBookingEmail({ bookingData }) {
  const { fullName, phoneNumber, title } = bookingData;
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard`;


  return (
    <Html lang="en">
      <Container style={container}>
        <Heading style={heading}>🚀 New Booking Received!</Heading>
        <Text style={paragraph}>A new travel package has been booked. Please review the details below and follow up promptly.</Text>
        <Section style={infoSection}>
          <Text><strong>Package:</strong> {title}</Text>
          <Text><strong>Customer Name:</strong> {fullName}</Text>
          <Text><strong>Phone Number:</strong> {phoneNumber}</Text>
        </Section>
        <Button href={dashboardUrl} style={button}>
          View in Admin Dashboard
        </Button>
      </Container>
    </Html>
  );
}

// Styles
const container = { fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' };
const heading = { color: '#333' };
const paragraph = { fontSize: '16px', color: '#555' };
const infoSection = { backgroundColor: '#ffffff', border: '1px solid #ddd', padding: '15px', borderRadius: '5px', margin: '20px 0' };
const button = { backgroundColor: '#007bff', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', textDecoration: 'none', display: 'inline-block' };
