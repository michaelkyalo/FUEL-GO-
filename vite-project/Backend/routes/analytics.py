from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from models import db, OrderAnalytics, Order
from flask_jwt_extended import jwt_required, get_jwt_identity

analytics = Blueprint('analytics', __name__)

@analytics.route('/api/analytics/summary', methods=['GET'])
@jwt_required()
def get_analytics_summary():
    # Get date range from query params with defaults
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=30)  # Last 30 days by default
    
    if 'start_date' in request.args:
        start_date = datetime.strptime(request.args['start_date'], '%Y-%m-%d').date()
    if 'end_date' in request.args:
        end_date = datetime.strptime(request.args['end_date'], '%Y-%m-%d').date()
    
    # Calculate analytics for missing dates
    current_date = start_date
    while current_date <= end_date:
        analytics = OrderAnalytics.calculate_daily_analytics(current_date)
        if analytics:
            db.session.add(analytics)
        current_date += timedelta(days=1)
    
    db.session.commit()
    
    # Fetch analytics for the date range
    analytics_data = OrderAnalytics.query.filter(
        OrderAnalytics.date.between(start_date, end_date)
    ).order_by(OrderAnalytics.date.asc()).all()
    
    return jsonify([a.to_dict() for a in analytics_data])