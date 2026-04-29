const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// --- Multer configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed!'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// POST /members  — Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name, role, email, rollNumber, year, degree,
      aboutProject, hobbies, certificate, internship, aboutYourAim,
    } = req.body;

    // Basic validation
    if (!name || !role || !email || !rollNumber || !year) {
      return res.status(400).json({ error: 'name, role, email, rollNumber, and year are required.' });
    }

    const hobbiesArray = hobbies
      ? (Array.isArray(hobbies) ? hobbies : hobbies.split(',').map((h) => h.trim()).filter(Boolean))
      : [];

    const member = new Member({
      name, role, email, rollNumber, year,
      degree: degree || 'B.Tech',
      aboutProject, hobbies: hobbiesArray,
      certificate, internship, aboutYourAim,
      image: req.file ? req.file.filename : '',
    });

    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members  — Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members/:id  — Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /members/:id  — Update a member
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.filename;
    if (updates.hobbies && typeof updates.hobbies === 'string') {
      updates.hobbies = updates.hobbies.split(',').map((h) => h.trim()).filter(Boolean);
    }
    const member = await Member.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /members/:id  — Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
