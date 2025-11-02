"""initial

Revision ID: 0001_initial
Revises: 
Create Date: 2025-11-02 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'order',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('fuel_type', sa.String(length=50), nullable=False),
        sa.Column('litres', sa.Float, nullable=False),
        sa.Column('price_per_litre', sa.Float, nullable=False),
        sa.Column('cost', sa.Float, nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=True),
    )


def downgrade():
    op.drop_table('order')