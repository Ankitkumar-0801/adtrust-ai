
export function analyzeAd(text) {
  const ad = text.toLowerCase()
  const warnings = []

  const rules = [
    {
      pattern: /registration fee|processing fee|joining fee|pay.*(?:first|now|immediately)|advance payment/,
      title: 'Payment requested in advance',
      explanation: 'The advertisement appears to request money before providing a job, service, or benefit.',
      points: 3
    },
    {
      pattern: /guaranteed job|100% job guarantee|guaranteed placement|sure shot selection/,
      title: 'Guaranteed outcome promised',
      explanation: 'Promises of guaranteed jobs or selection should be independently checked.',
      points: 2
    },
    {
      pattern: /limited seats|act now|hurry up|offer ends today|urgent|last chance|apply immediately/,
      title: 'Urgency or pressure tactics',
      explanation: 'Pressure to act quickly can discourage people from checking an offer carefully.',
      points: 1
    },
    {
      pattern: /share.*otp|otp.*share|tell us.*otp|send.*password|share.*password/,
      title: 'Request for OTP or password',
      explanation: 'Never share an OTP or password with an advertiser or unknown person.',
      points: 4
    },
    {
      pattern: /no experience required|earn.*per day|earn.*per month|work from home.*income|easy money/,
      title: 'Attractive earning claim',
      explanation: 'Unusually attractive earning claims should be checked against reliable sources.',
      points: 1
    },
    {
      pattern: /bank account details|card number|cvv|upi pin|internet banking password/,
      title: 'Sensitive financial information requested',
      explanation: 'Do not share banking credentials, card security details, or UPI PINs.',
      points: 4
    }
  ]

  for (const rule of rules) {
    if (rule.pattern.test(ad)) {
      warnings.push({
        title: rule.title,
        explanation: rule.explanation,
        points: rule.points
      })
    }
  }

  const score = warnings.reduce((total, warning) => total + warning.points, 0)

  let riskLevel = 'Low'
  if (score >= 6) {
    riskLevel = 'High'
  } else if (score >= 3) {
    riskLevel = 'Medium'
  }

  const emails = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []
  const phones = text.match(/(?:\+91[\s-]?)?[6-9]\d{9}\b/g) || []
  const fees = text.match(/(?:₹|rs\.?\s?)(\d[\d,]*)/gi) || []
  const dates = text.match(/\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{2,4})\b/gi) || []

  return {
    riskLevel,
    score,
    warnings,
    emails: [...new Set(emails)],
    phones: [...new Set(phones)],
    fees: [...new Set(fees)],
    dates: [...new Set(dates)],
    verification: 'Unverified'
  }
}
