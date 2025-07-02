# DXBT - Dubai Travel Expense Tracker

<p align="center">
  <img src="src/assets/logo.png" alt="DXBT Logo" width="200"/>
</p>

A comprehensive travel expense tracker and document manager specifically designed for travelers to Dubai. Keep track of your expenses, manage travel documents, and monitor your budget in one place.

## 🌟 Features

- 💰 **Expense Tracking**: Log and categorize your travel expenses
- 📊 **Visual Analytics**: Interactive charts for expense analysis
- 📁 **Document Management**: Securely store and access important travel documents
- 💱 **Currency Conversion**: Built-in currency converter with real-time rates
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Secure**: Local data storage for privacy

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dxbt.git
   cd dxbt
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable UI components
├── pages/           # Application pages
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_APP_TITLE="DXBT - Dubai Travel Expense Tracker"
VITE_API_BASE_URL=your_api_base_url
# Add other environment variables as needed
```

## 📝 Usage

1. **Add Expenses**:
   - Click on "Money Out" to add new expenses
   - Categorize your expenses for better tracking
   
2. **Track Income**:
   - Log any income or money received during your trip
   
3. **View Analytics**:
   - Check the dashboard for expense breakdowns and visualizations
   
4. **Manage Documents**:
   - Upload and access important travel documents

## 📱 Technologies Used

- React.js
- Vite
- React Router
- Chart.js (for visualizations)
- Tailwind CSS (for styling)
- React Icons

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for travelers to Dubai
- Special thanks to all the open-source libraries used in this project
