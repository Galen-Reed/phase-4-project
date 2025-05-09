"""added notes to UserTicket model

Revision ID: 057bb641d37f
Revises: 
Create Date: 2025-05-07 18:45:47.933750

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '057bb641d37f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_ticket', schema=None) as batch_op:
        batch_op.add_column(sa.Column('notes', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('timestamp', sa.DateTime(), nullable=True))
        batch_op.drop_column('role')
        batch_op.drop_column('assigned_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_ticket', schema=None) as batch_op:
        batch_op.add_column(sa.Column('assigned_date', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('role', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('timestamp')
        batch_op.drop_column('notes')

    # ### end Alembic commands ###
