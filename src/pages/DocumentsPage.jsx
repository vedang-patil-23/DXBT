import React, { useState } from 'react';

// Document data - can be moved to a separate file if needed
const DOCS = [
  { 
    label: "My Travel Tickets", 
    file: "UAE Return Trip.pdf",
    icon: "✈️"
  },
  { 
    label: "My Passport", 
    file: "passport.pdf",
    icon: "📘"
  },
  { 
    label: "Proof-of-Stay", 
    file: "PoS.pdf",
    icon: "🏨"
  },
  { 
    label: "My Visa", 
    file: "visa.pdf",
    icon: "🛂"
  }
];

// Document viewer component with improved styling and error handling
const DocumentViewer = ({ document }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get URL for PDF in the public directory
  const getPdfUrl = (filename) => {
    if (!filename) return null;
    return `/documents/${encodeURIComponent(filename)}`;
  };

  const pdfUrl = getPdfUrl(document?.file);

  if (!pdfUrl) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#ff6b6b',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderRadius: '8px',
        border: '1px dashed rgba(255, 107, 107, 0.3)'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❌</div>
        <h3 style={{ margin: '0.5rem 0', color: '#fff' }}>Document Not Found</h3>
        <p style={{ margin: '0.5rem 0 1.5rem', color: '#ddd' }}>
          The requested document could not be found. Please try again or contact support.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Document Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{
          margin: 0,
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>{document.icon}</span>
          {document.label}
        </h3>
        <a 
          href={pdfUrl} 
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            color: '#d4af37',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            ':hover': {
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              transform: 'translateY(-1px)'
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </a>
      </div>
      
      {/* PDF Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        borderRadius: '0 0 8px 8px'
      }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              borderTopColor: '#d4af37',
              animation: 'spin 1s ease-in-out infinite',
              marginBottom: '1rem'
            }}></div>
            <p style={{ color: '#fff', margin: 0 }}>Loading document...</p>
          </div>
        )}
        
        <iframe 
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title={document.label}
          onLoad={() => {
            setIsLoading(false);
            setError(null);
          }}
          onError={() => {
            setIsLoading(false);
            setError('Failed to load PDF. The document may be corrupted or unavailable.');
          }}
          style={{ 
            width: '100%', 
            height: '100%', 
            opacity: isLoading ? 0 : 1,
            background: 'white',
            border: 'none',
            transition: 'opacity 0.3s ease',
            borderRadius: '0 0 8px 8px'
          }}
          frameBorder="0"
        />
        
        {error && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(30, 30, 35, 0.95)',
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '0 0 8px 8px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 style={{
              color: '#fff',
              margin: '0 0 0.75rem',
              fontSize: '1.25rem',
              fontWeight: '500'
            }}>
              Unable to Load Document
            </h3>
            <p style={{
              color: '#bbb',
              margin: '0 0 1.5rem',
              maxWidth: '400px',
              lineHeight: '1.5'
            }}>
              {error}
            </p>
            <a 
              href={pdfUrl} 
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                color: '#d4af37',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="documents-page">
      <h1>Documents</h1>
      
      <div className="documents-container">
        {/* Document List */}
        <div className="documents-list">
          <h3>My Documents</h3>
          <ul>
            {DOCS.map((doc) => (
              <li 
                key={doc.file}
                className={selectedDoc?.file === doc.file ? 'active' : ''}
                onClick={() => setSelectedDoc(doc)}
              >
                <span>{doc.label}</span>
                <a 
                  href={`/documents/${encodeURIComponent(doc.file)}`}
                  download
                  className="download-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Document Viewer */}
        <div className="document-viewer-container">
          {selectedDoc ? (
            <DocumentViewer document={selectedDoc} />
          ) : (
            <div className="no-document-selected">
              <div>📄</div>
              <h3>Select a document to view</h3>
              <p>Choose a document from the list to view it here</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .documents-page {
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h1 {
          margin: 0 0 1.5rem 0;
          color: #333;
        }
        
        .documents-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .documents-container {
            flex-direction: row;
            min-height: 70vh;
          }
        }
        
        .documents-list {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        @media (min-width: 768px) {
          .documents-list {
            width: 250px;
            flex-shrink: 0;
          }
        }
        
        .documents-list h3 {
          margin: 0 0 1rem 0;
          color: #A68E45;
        }
        
        .documents-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .documents-list li {
          padding: 0.75rem 1rem;
          margin: 0.25rem 0;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        
        .documents-list li:hover {
          background-color: #f5f5f5;
        }
        
        .documents-list li.active {
          background-color: #F5F2E9;
          color: #A68E45;
          font-weight: 600;
        }
        
        .download-link {
          color: #A68E45;
          text-decoration: none;
          font-size: 0.8rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          border: 1px solid #A68E45;
          transition: all 0.2s ease;
        }
        
        .download-link:hover {
          background-color: #F5F2E9;
        }
        
        .document-viewer-container {
          flex: 1;
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        
        .no-document-selected {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #666;
          text-align: center;
          padding: 2rem;
        }
        
        .no-document-selected div {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .document-viewer {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .document-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .document-header h3 {
          margin: 0;
        }
        
        .download-btn {
          padding: 0.4rem 1rem;
          background-color: #A68E45;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .download-btn:hover {
          background-color: #8a753a;
        }
        
        .pdf-container {
          flex: 1;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        
        .pdf-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          transition: opacity 0.3s ease;
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          z-index: 10;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #A68E45;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .document-error {
          text-align: center;
          padding: 2rem;
          color: #d32f2f;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
