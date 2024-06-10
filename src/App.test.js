// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const elliptic = require("elliptic");
const {
  QRCodeCategories,
  QRCodeScanError,
  InvalidQRCodeError,
  UnknownQRCodeCategory,
  InvalidBadgeError,
  InvalidLinkError,
  InvalidContactError,
  InvalidBadgeSignatureError,
  isValidLink,
  detectQrTypeAndValidate,
  decodeContact,
  decodePageLink,
  decodeEventLink,
  decodeAndValidateBadge,
  decodeQr,
  encodeContact,
} = require("./lib/qr");

// Esempio di chiave pubblica
// const publicKey = `
// -----BEGIN PUBLIC KEY-----
// MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgOgEXwBKaEE6OGrXH+EST/Cq+gXM
// +GoVPETVH7lWGM5eYgns3e/4NMG1OFV3ye/BnPxh/2KUQ/AMwgJBZK6NmQ==
// -----END PUBLIC KEY-----`;

const publicKey =
  "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgOgEXwBKaEE6OGrXH+EST/Cq+gXM\n+GoVPETVH7lWGM5eYgns3e/4NMG1OFV3ye/BnPxh/2KUQ/AMwgJBZK6NmQ==\n-----END PUBLIC KEY-----";

describe("QRCodeCategories", () => {
  it("should have the correct symbols", () => {
    expect(QRCodeCategories.PageLink).toBeDefined();
    expect(QRCodeCategories.EventLink).toBeDefined();
    expect(QRCodeCategories.Contact).toBeDefined();
    expect(QRCodeCategories.Badge).toBeDefined();
  });
});

describe("Error classes", () => {
  it("should create QRCodeScanError", () => {
    const error = new QRCodeScanError("Test error");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("QRCodeScanError");
  });

  it("should create InvalidQRCodeError", () => {
    const error = new InvalidQRCodeError();
    expect(error).toBeInstanceOf(QRCodeScanError);
    expect(error.name).toBe("InvalidQRCodeError");
  });

  it("should create UnknownQRCodeCategory", () => {
    const error = new UnknownQRCodeCategory();
    expect(error).toBeInstanceOf(QRCodeScanError);
    expect(error.name).toBe("UnknownQRCodeCategory");
  });

  it("should create InvalidBadgeError", () => {
    const error = new InvalidBadgeError();
    expect(error).toBeInstanceOf(QRCodeScanError);
    expect(error.name).toBe("InvalidBadgeError");
  });

  it("should create InvalidLinkError", () => {
    const error = new InvalidLinkError();
    expect(error).toBeInstanceOf(QRCodeScanError);
    expect(error.name).toBe("InvalidLinkError");
  });

  it("should create InvalidContactError", () => {
    const error = new InvalidContactError();
    expect(error).toBeInstanceOf(QRCodeScanError);
    expect(error.name).toBe("InvalidContactError");
  });

  it("should create InvalidBadgeSignatureError", () => {
    const userInfo = { test: "test" };
    const error = new InvalidBadgeSignatureError(userInfo);
    expect(error).toBeInstanceOf(InvalidBadgeError);
    expect(error.name).toBe("InvalidBadgeSignatureError");
    expect(error.userInfo).toBe(userInfo);
  });
});

describe("Utility functions", () => {
  it("should validate a correct link", () => {
    expect(isValidLink("E#41895ab6-abf1-4268-a146-61786fd667a5")).toBe(true);
  });

  it("should invalidate an incorrect link", () => {
    expect(isValidLink("E#invalid-uuid")).toBe(false);
  });
});

describe("QR code type detection and validation", () => {
  it("should detect a PageLink QR code", () => {
    expect(
      detectQrTypeAndValidate("P#41895ab6-abf1-4268-a146-61786fd667a5")
    ).toBe(QRCodeCategories.PageLink);
  });

  it("should throw InvalidLinkError for invalid PageLink QR code", () => {
    expect(() => detectQrTypeAndValidate("P#invalid-uuid")).toThrow(
      InvalidLinkError
    );
  });

  it("should detect an EventLink QR code", () => {
    expect(
      detectQrTypeAndValidate("E#41895ab6-abf1-4268-a146-61786fd667a5")
    ).toBe(QRCodeCategories.EventLink);
  });

  it("should throw InvalidLinkError for invalid EventLink QR code", () => {
    expect(() => detectQrTypeAndValidate("E#invalid-uuid")).toThrow(
      InvalidLinkError
    );
  });

  it("should detect a Contact QR code", () => {
    const contactData = JSON.stringify({ contact: "example" });
    expect(detectQrTypeAndValidate(contactData)).toBe(QRCodeCategories.Contact);
  });

  it("should throw InvalidQRCodeError for invalid JSON", () => {
    expect(() => detectQrTypeAndValidate("{invalid-json}")).toThrow(
      InvalidQRCodeError
    );
  });

  it("should detect a Badge QR code", () => {
    const validBadge = Buffer.from(
      "B#41895ab6-abf1-4268-a146-61786fd667a5#John#Doe#john.doe@example.com#1234567890#ScoutGroup#Region#Line#Subdistrict#District#Squad"
    ).toString("base64");
    const validSignature =
      "unHijBOPMK3YmL95olF+OwGayPkz95bpef0rH+sfd9qGz/wHPseYHHiKiqSes12gzWArzrxrQbJlugXdgP6fVg==";
    expect(detectQrTypeAndValidate(`${validBadge}#${validSignature}`)).toBe(
      QRCodeCategories.Badge
    );
  });

  it("should throw InvalidBadgeError for invalid Badge QR code", () => {
    const invalidBadge = Buffer.from("B#invalid-badge-data").toString("base64");
    const invalidSignature = "invalid-signature";
    expect(() =>
      detectQrTypeAndValidate(`${invalidBadge}#${invalidSignature}`)
    ).toThrow(InvalidBadgeError);
  });
});

describe("QR code encoder", () => {
  it("should encode a contact", () => {
    const contactData = encodeContact(
      "myUuid",
      "name",
      "second-name",
      "333444555",
      "john@doe.com",
      "some text",
      "https://mysite.com"
    );
    expect(contactData).toEqual(
      JSON.stringify({
        contact: {
          uuid: "myUuid",
          firstName: "name",
          lastName: "second-name",
          phone: "333444555",
          email: "john@doe.com",
          note: "some text",
          url: "https://mysite.com",
        },
      })
    );
  });
});

describe("QR code decoders", () => {
  it("should decode a contact QR code", () => {
    const contactData = JSON.stringify({ contact: "example" });
    expect(decodeContact(contactData)).toEqual({
      type: "contact",
      contact: "example",
    });
  });

  it("should decode a PageLink QR code", () => {
    const uuid = "41895ab6-abf1-4268-a146-61786fd667a5";
    expect(decodePageLink(`P#${uuid}`)).toEqual({
      type: "page",
      url: `/pages/${uuid}`,
    });
  });

  it("should decode an EventLink QR code", () => {
    const uuid = "41895ab6-abf1-4268-a146-61786fd667a5";
    expect(decodeEventLink(`E#${uuid}`)).toEqual({
      type: "event",
      url: `/eventi/${uuid}`,
    });
  });

  it("should decode and validate a valid Badge QR code", () => {
    const encodedBadge =
      "QiNhODNmNTQwZC1mYzI4LTQ0MTUtYTU0Ni1mZjMwNGM4YzBjZDEjQ29uY2V0dGEjQ2FjY2lvcHBvbGkjYW5pdGEzN0BleGFtcGxlLm9yZyMwOTk0NjE5MTEzNyNDQVNFIE5VT1ZFIDczIyM1I0wjVklPTEEj";

    const validSignature =
      "unHijBOPMK3YmL95olF+OwGayPkz95bpef0rH+sfd9qGz/wHPseYHHiKiqSes12gzWArzrxrQbJlugXdgP6fVg==";
    const data = `${encodedBadge}#${validSignature}`;
    const res = decodeAndValidateBadge(data, publicKey);
    expect(res.validSignature).toBe(true);
    expect(res.type).toBe("badge");
    expect(res.userInfo.uuid).toBe("a83f540d-fc28-4415-a546-ff304c8c0cd1");
  });

  // it("should throw InvalidBadgeSignatureError for invalid signature", () => {
  //   const encodedBadge =
  //     "QiMwODliNjU2MC01Y2M5LTRiOTAtYjhmMi1iYWRkMmExYmE1NWEjRGVtbyNDb2dub21lI2RlbW9AZXhhbXBsZS5jb20jKzM5MDk4NzY1MjM0I1NJTFZJIE1BUklOQSAzNiMjNC0xNiM0I1N0YWZm";

  //   const invalidSignature = "invalid-signature";
  //   const data = `${encodedBadge}#${invalidSignature}`;
  //   expect(() => decodeAndValidateBadge(data, publicKey)).toThrow(
  //     InvalidBadgeSignatureError
  //   );
  // });
});

describe("QR code main decoder function", () => {
  it("Should detect an event link with correct uuid", () => {
    expect(decodeQr("E#41895ab6-abf1-4268-a146-61786fd667a5")).toEqual({
      type: "event",
      url: "/eventi/41895ab6-abf1-4268-a146-61786fd667a5",
    });
  });
  it("Should detect a page link with correct uuid", () => {
    expect(decodeQr("P#41895ab6-abf1-4268-a146-61786fd667a5")).toEqual({
      type: "page",
      url: "/pages/41895ab6-abf1-4268-a146-61786fd667a5",
    });
  });
});
