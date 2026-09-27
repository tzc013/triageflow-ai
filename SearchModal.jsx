import React, { useState, useEffect } from 'react';
import { Search, X, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryBadge } from '../ui/Badges.jsx';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/emails?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-[#0a0b0c]/80 backdrop-blur-sm p-4">
      <div 
        id="search-command-palette"
        className="w-full max-w-2xl bg-[#111315] border border-[#22262a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[#22262a]">
          <Search className="w-5 h-5 text-[#7fa48b] mr-3 shrink-0" />
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emails, senders, subjects, decisions..."
            className="w-full bg-transparent text-sm text-[#f6f8fa] placeholder-[#656e77] outline-none"
            autoFocus
          />
          <button 
            id="close-search-btn"
            onClick={onClose}
            className="p-1 rounded text-[#8c959f] hover:text-[#f6f8fa] hover:bg-[#16181b]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {loading && (
            <div className="py-8 text-center text-xs text-[#8c959f]">Searching email intelligence...</div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-xs text-[#656e77]">No emails matched your query.</div>
          )}

          {!query && (
            <div className="px-3 py-6 text-center text-xs text-[#656e77]">
              Type to search through all ingested emails, sender records, and AI decisions.
            </div>
          )}

          {results.map((email) => (
            <div
              key={email.id}
              id={`search-result-${email.id}`}
              onClick={() => {
                onClose();
                navigate(`/inbox?id=${email.id}`);
              }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[#16181b] cursor-pointer group border border-transparent hover:border-[#22262a] transition-all mb-1"
            >
              <div className="flex items-start gap-3 min-w-0 pr-2">
                <Mail className="w-4 h-4 text-[#7fa48b] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#f6f8fa] truncate">{email.sender_name || email.sender_email}</span>
                    <CategoryBadge category={email.category} />
                  </div>
                  <p className="text-xs text-[#b0b8c1] truncate mt-0.5">{email.subject}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#656e77] group-hover:text-[#7fa48b] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>

        <div className="px-4 py-2 bg-[#0a0b0c] border-t border-[#22262a] flex items-center justify-between text-[11px] text-[#656e77]">
          <span>Tip: Press ESC to exit</span>
          <span className="font-mono">⌘ K</span>
        </div>
      </div>
    </div>
  );
}
