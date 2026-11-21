import axios from 'axios'
import { useState } from 'react'
import {
  ShieldCheck,
  Search,
  Upload,
  FileText,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react'

function App() {
  const [adText, setAdText] = useState('')
  const [status, setStatus] = useState('')
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [domainResults, setDomainResults] = useState({})
  const [imageFile, setImageFile] = useState(null)

const handleImageAnalyze = async () => {
  if (!imageFile) {
    setStatus('Please upload an advertisement image.')
    return
  }

  setIsLoading(true)
  setStatus('')
  setReport(null)

  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/analyze-image`,
      formData
    )

    setReport(response.data.analysis)
    setStatus('Image analysis completed successfully!')
  } catch (error) {
  console.error('Image Analysis Error:', error)

  console.error(
    'Server Response:',
    error.response?.data
  )

  setStatus(
    error.response?.data?.error ||
    error.message ||
    'Image analysis failed.'
  )
} finally {
    setIsLoading(false)
  }
}


  const handleCheckDomain = async (website) => {
  try {
    setDomainResults(prev => ({
      ...prev,
      [website]: { loading: true }
    }))

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/check-domain`,
      { website }
    )

    setDomainResults(prev => ({
      ...prev,
      [website]: response.data
    }))
  } catch (error) {
    setDomainResults(prev => ({
      ...prev,
      [website]: {
        status: 'Unable to check',
        message: error.response?.data?.error || 'Domain lookup failed.'
      }
    }))
  }
}

  const sampleAd = `Earn ₹50,000 per month working from home!
No experience required. Guaranteed job placement.
Pay a registration fee of ₹999 today.
Limited seats available. Apply immediately!`

  
const handleAnalyze = async () => {
  if (!adText.trim()) {
    setReport(null)
    setStatus('Please paste an advertisement before analyzing.')
    return
  }

  try {
    setIsLoading(true)
    setReport(null)
    setStatus('')

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/analyze-ad`,
      {
        adText: adText
      }
    )

    setReport(response.data.analysis)

  } catch (error) {
    console.error('Analysis error:', error)

    setStatus(
      error.response?.data?.error ||
      'Unable to analyze advertisement. Please try again.'
    )

  } finally {
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <ShieldCheck size={25} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              AdTrust<span className="text-blue-600"> AI</span>
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#home" className="hover:text-blue-600">Home</a>
            <a href="#scanner" className="hover:text-blue-600">Ad Scanner</a>
            <a href="#how-it-works" className="hover:text-blue-600">How It Works</a>
          </div>

          <a
            href="#scanner"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Scan an Ad
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <Sparkles size={16} />
          AI-Powered Advertisement Intelligence
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Think Before
          <span className="text-blue-600"> You Trust.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Analyze advertisements, identify suspicious claims, and make
          informed decisions before you trust an offer.
        </p>

        <a
          href="#scanner"
          className="mt-9 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          Check an Advertisement
          <ArrowRight size={18} />
        </a>

        <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600" />
            Trust-focused analysis
          </span>
          <span className="flex items-center gap-2">
            <LockKeyhole size={18} className="text-green-600" />
            Privacy-conscious
          </span>
          <span className="flex items-center gap-2">
            <Search size={18} className="text-green-600" />
            Evidence-oriented checks
          </span>
        </div>
      </section>

      {/* Scanner */}
      <section id="scanner" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Advertisement Scanner
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Check Before You Click
            </h2>
            <p className="mt-4 text-slate-500">
              Paste an advertisement below to prepare it for trust analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center gap-2 font-semibold">
                <FileText size={19} className="text-blue-600" />
                Advertisement Content
              </label>

              <button
                onClick={() => {
                  setAdText(sampleAd)
                  setStatus('')
                }}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Try sample ad
              </button>
            </div>

            <textarea
              value={adText}
              onChange={(e) => {
                setAdText(e.target.value)
                setStatus('')
              }}
              placeholder="Paste the advertisement text here..."
              className="min-h-56 w-full resize-y rounded-xl border border-slate-300 bg-white p-5 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            
<div className="mt-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
  <div className="text-center">
    <h3 className="font-semibold text-slate-800">
      Or upload an advertisement image
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      JPG, PNG and WEBP (Maximum 5 MB)
    </p>

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={(e) => {
        setImageFile(e.target.files?.[0] || null)
        setStatus('')
      }}
      className="mt-4 block w-full text-sm text-slate-600"
    />

    {imageFile && (
      <p className="mt-3 text-sm font-medium text-blue-700">
        Selected: {imageFile.name}
      </p>
    )}

    <button
      onClick={handleImageAnalyze}
      disabled={isLoading || !imageFile}
      className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? 'Analyzing Image...' : 'Analyze Image'}
    </button>
  </div>
</div>

            <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-slate-500">
                <LockKeyhole size={13} className="mr-1 inline" />
                Avoid pasting passwords, OTPs, or sensitive personal data.
              </p>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                <Search size={18} />
                  {isLoading ? 'Analyzing...' : 'Analyze Advertisement'}
                </button>
            </div>

            {status && (
              <div className="mt-5 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                {status}
              </div>
            )}


{report && (
  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold">
      Advertisement Analysis Report
    </h2>

    {/* Summary */}
    <div className="mt-5 rounded-xl bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-500">
        AI Analysis Summary
      </p>
      <p className="mt-2 leading-7 text-slate-700">
        {report.summary}
      </p>

      <h3 className={`mt-5 text-2xl font-bold ${
        report.riskLevel === 'High'
          ? 'text-red-600'
          : report.riskLevel === 'Medium'
          ? 'text-amber-600'
          : 'text-green-600'
      }`}>
        {report.riskLevel} Risk
      </h3>
    </div>

    {/* Claims */}
    <div className="mt-6">
      <h3 className="font-bold">Claims Made in Advertisement</h3>

      {report.claims?.length > 0 ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {report.claims.map((claim, index) => (
            <li key={index}>{claim}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500">
          No specific claims identified.
        </p>
      )}
    </div>

    {/* Warnings */}
    <div className="mt-6">
      <h3 className="font-bold">Suspicious Indicators</h3>

      {report.warnings?.length > 0 ? (
        <div className="mt-3 space-y-3">
          {report.warnings.map((warning, index) => (
            <div
              key={index}
              className="rounded-lg border border-amber-200 bg-amber-50 p-4"
            >
              <h4 className="font-semibold text-amber-900">
                {index + 1}. {warning.title}
              </h4>
              <p className="mt-1 text-sm text-amber-800">
                {warning.explanation}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          No obvious warning indicators were identified.
          This does not prove the advertisement is genuine.
        </p>
      )}
    </div>
    {/* Extracted Information */}
<div className="rounded-2xl border border-slate-200 bg-white p-6">
  <h3 className="text-lg font-bold text-slate-900">
    Extracted Information
  </h3>

  <div className="mt-4 space-y-4 text-sm">
    <div>
      <p className="font-semibold text-slate-700">Advertiser</p>
      <p className="text-slate-600">
        {report.extractedInformation?.advertiserName || 'Not mentioned'}
      </p>
    </div>

    <div>
      <p className="font-semibold text-slate-700">Emails</p>
      <p className="text-slate-600">
        {report.extractedInformation?.emails?.join(', ') || 'None found'}
      </p>
    </div>

    <div>
      <p className="font-semibold text-slate-700">Phone Numbers</p>
      <p className="text-slate-600">
        {report.extractedInformation?.phoneNumbers?.join(', ') || 'None found'}
      </p>
    </div>

    <div>
  <p className="font-semibold text-slate-700 mb-2">Website Verification</p>

  {report.extractedInformation?.websites?.length > 0 ? (
    report.extractedInformation.websites.map((website, index) => (
      <div key={index} className="mb-4 rounded-xl border border-slate-200 p-4">
        <p className="font-medium text-slate-800 break-all">
          {website}
        </p>

        <button
          onClick={() => handleCheckDomain(website)}
          disabled={domainResults[website]?.loading}
          className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {domainResults[website]?.loading
            ? 'Checking...'
            : 'Check Domain'}
        </button>

        {domainResults[website] && !domainResults[website].loading && (
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
            <p className="font-semibold text-slate-800">
              {domainResults[website].status}
            </p>

            <p className="mt-1 text-slate-600">
              {domainResults[website].message}
            </p>

            {domainResults[website].registrationDate && (
  <p className="mt-1 text-slate-600">
    Registration date: {
      new Date(
        domainResults[website].registrationDate
      ).toLocaleDateString()
    }
  </p>
)}

{domainResults[website].domainAge && (
  <p className="mt-1 font-medium text-slate-700">
    Domain Age: {domainResults[website].domainAge.years} years,
    {' '}{domainResults[website].domainAge.months} months
  </p>
)}

{domainResults[website].domainAge && (
  <p className="mt-1 font-medium text-slate-700">
    Domain Age: {domainResults[website].domainAge.years} years,
    {' '}{domainResults[website].domainAge.months} months
  </p>
)}
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-slate-600">No websites found in this advertisement.</p>
  )}
</div>

    <div>
      <p className="font-semibold text-slate-700">Fees</p>
      <p className="text-slate-600">
        {report.extractedInformation?.fees?.join(', ') || 'None mentioned'}
      </p>
    </div>

    <div>
      <p className="font-semibold text-slate-700">Important Dates</p>
      <p className="text-slate-600">
        {report.extractedInformation?.importantDates?.join(', ') || 'None mentioned'}
      </p>
    </div>
  </div>
</div>

    {/* Recommended Actions */}
    <div className="mt-6">
      <h3 className="font-bold">Recommended Actions</h3>

      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
        {report.recommendedActions?.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>

    {/* Verification Status */}
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <p className="font-semibold text-blue-900">
        Verification Status: {report.verificationStatus || 'Unverified'}
      </p>

      <p className="mt-1 text-sm text-blue-800">
        This analysis is AI-generated. It does not independently
        verify the advertiser or prove that the advertisement is genuine.
      </p>
    </div>

  </div>
)}


          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <ShieldCheck className="mb-3 text-blue-600" size={25} />
              <h3 className="font-semibold">Source Authenticity</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Examine who is behind the advertisement.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <AlertTriangle className="mb-3 text-amber-500" size={25} />
              <h3 className="font-semibold">Risk Indicators</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Identify suspicious language and warning signs.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <CheckCircle2 className="mb-3 text-green-600" size={25} />
              <h3 className="font-semibold">Evidence & Claims</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Separate verifiable information from unverified claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How AdTrust AI Works</h2>
          <p className="mt-3 text-slate-500">
            Three simple steps toward more informed decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ['01', 'Submit an Advertisement', 'Paste the advertisement you want to check.'],
            ['02', 'Analyze the Information', 'Examine claims, sources, and potential warning signs.'],
            ['03', 'Review the Findings', 'Understand what is verified, unverified, or suspicious.']
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl bg-white p-7 shadow-sm">
              <span className="text-3xl font-extrabold text-blue-200">{number}</span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 font-bold">
          <ShieldCheck className="text-blue-600" size={21} />
          AdTrust AI
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Think Before You Trust. Make informed decisions.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Prototype project. Analysis features are under development.
        </p>
      </footer>
    </div>
  )
}

export default App
